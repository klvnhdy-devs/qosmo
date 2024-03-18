<?php
ini_set('max_execution_time', '60');
header('Content-Type: application/json; charset=utf-8');

if (strtoupper($_SERVER['REQUEST_METHOD']) === 'GET') {


    if (!isset($_GET['cmd'])) {
        echo json_encode(['status' => 400, 'msg' => 'cmd not set!']);
        exit();
    }


    switch ($_GET['cmd']) {

        case 'ping':

            echo json_encode(['status' => 200, 'data' => 'pong']);

            break;

        case 'overview-sla':

            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $db = $conn_res->conn;
                $q = "select region,avg(packetloss) avg_pl,avg(latency) avg_lat, avg(jitter) avg_jitt from ci_twamp.twamp_4g_weekly
                where tanggal > date_sub(now(), interval 1 month) 
                group by 1 order by 1";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $db->close();

                echo json_encode(['status' => 200, 'data' => $a]);
            }
            break;

        case 'overview-trend-latency':
            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $db_twamp = $conn_res->conn;
                $cores = [];
                $periods = [];

                // core
                $q = "select date_format(date,'%Y-%m-01') month_period, avg(packetloss) avg_pl,avg(latency/1000) avg_lat,avg(jitter/100) avg_jitt from ci_bk.brix_cti
                where date > date_format(date_sub(now(), interval 12 month),'%Y-%m-01') group by 1 order by 1";
                $q = $db_twamp->query($q);

                while ($b = $q->fetch_assoc()) {
                    $periods[$b['month_period']] = $b['month_period'];
                    $cores[$b['month_period']]['vals'] = $b['avg_pl'] . "|" . $b['avg_lat'] . "|" . $b['avg_jitt'];
                }
                $q->free_result();


                // access
                $q = "select date_format(tanggal,'%Y-%m-%01') month_period,avg(packetloss) avg_pl,avg(latency) avg_lat, avg(jitter) avg_jitt
                from ci_twamp.twamp_4g_weekly where tanggal > date_format(date_sub(now(), interval 12 month),'%Y-%m-01')
                group by 1 order by 1";


                $q = $db_twamp->query($q);
                $access = [];
                while ($b = $q->fetch_assoc()) {
                    $periods[$b['month_period']] = $b['month_period'];
                    $access[$b['month_period']]['vals'] = $b['avg_pl'] . "|" . $b['avg_lat'] . "|" . $b['avg_jitt'];
                }
                $q->free_result();
                $db_twamp->close();

                // CE
                $conn_res = connect_dbtutela();
                if (!$conn_res->success) {
                    echo json_encode(['status' => 500, 'msg' => 'cannot connect to DB']);
                } else {
                    $db = $conn_res->conn;
                    $q = "select to_char(date_start, 'YYYY-MM-01') month_period,avg(avg_packetloss) avg_pl,avg(avg_latency) avg_lat, avg(avg_jitter) avg_jitt
                    from production.report.tutela_mobile_weekly_nation where date_start >= to_char(now() - interval '12 months','YYYY-MM-01')::date 
                    group by 1 order by 1";
                    $result = pg_query($db, $q);

                    $ce = [];
                    while ($b = pg_fetch_assoc($result)) {
                        $periods[$b['month_period']] = $b['month_period'];
                        $ce[$b['month_period']]['vals'] = $b['avg_pl'] . "|" . $b['avg_lat'] . "|" . $b['avg_jitt'];
                    }
                    pg_free_result($result);
                    pg_close($db);

                    $data = [];
                    $i = 0;
                    foreach ($periods as $p => $pn) {
                        $data[$i]['periode'] = $p;
                        $data[$i]['core'] = array_key_exists($p, $cores) ? $cores[$p]['vals'] : null;
                        $data[$i]['access'] = array_key_exists($p, $access) ? $access[$p]['vals'] : null;
                        $data[$i]['ce'] = array_key_exists($p, $ce) ? $ce[$p]['vals'] : null;
                        $i++;
                    }
                }

                echo json_encode(['status' => 200, 'data' => $data]);
            }
            break;

        case 'site-issue-notclear':
            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $db = $conn_res->conn;

                // site not clear
                $q = "select region,sum(case when (packetloss_status = 'CONSECUTIVE' OR latency_status!='CLEAR' OR jitter_status!='CLEAR') then 1 else 0 end) site_not_clear 
                            from ci_twamp.twamp_4g_weekly where tanggal > date_sub(now(), interval 1 month) group by 1 order by 1";
                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $db->close();
                echo json_encode(['status' => 200, 'data' => $a]);
            }
            break;

        case 'weekly-sla-pl-bbc':

            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $db = $conn_res->conn;
                $q = "select s.*,t.target_sla,round((1-(site_not_clear/total_sites))*100,2) realisasi,
                round(((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites) site_clear_hijau,
                round((t.target_sla/100) * s.total_sites) site_clear_kuning,
                round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) batas_site_not_clear_hijau,
                round(total_sites - ((t.target_sla/100) * s.total_sites)) batas_site_not_clear_kuning,
                concat('< ',round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1) toleransi_site_not_clear_hijau,
                concat(round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1,' - ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_kuning,
                concat('> ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_merah
         from (
             select id_region_tsel,
                 case when id_region_tsel in (4,5,6) then concat(id_region_tsel,'-',region_tsel,case when io=1 then ' INNER' else ' OUTER' end)
                 else concat(id_region_tsel,'-',region_tsel) end region,
                    max(week) week_num,count(distinct site_id) total_sites,
                                     sum(case
                                         when (packetloss_status = 'CONSECUTIVE') then 1
                                         else 0 end
                                      ) site_not_clear
                                     from ci_twamp.twamp_4g_weekly
                              where week = (select max(week) from ci_twamp.twamp_4g_weekly)
                              and city_cluster = 'BB City'
                              group by 1,2 order by id_region_tsel,region_tsel
             ) s join master.region_sla_target t on s.id_region_tsel=t.id_region_tsel and s.region=concat(t.id_region_tsel,'-',t.region_tsel) 
             where t.city_cluster = 'BB City' and sla_group='pl-bbc' order by 1,2";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $db->close();

                echo json_encode(['status' => 200, 'data' => $a]);
            }
            break;
        case 'weekly-sla-pl-nbbc':

            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $db = $conn_res->conn;
                $q = "select s.*,t.target_sla,round((1-(site_not_clear/total_sites))*100,2) realisasi,
                round(((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites) site_clear_hijau,
                round((t.target_sla/100) * s.total_sites) site_clear_kuning,
                round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) batas_site_not_clear_hijau,
                round(total_sites - ((t.target_sla/100) * s.total_sites)) batas_site_not_clear_kuning,
                concat('< ',round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1) toleransi_site_not_clear_hijau,
                concat(round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1,' - ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_kuning,
                concat('> ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_merah
         from (
             select id_region_tsel,concat(id_region_tsel,'-',region_tsel) region,
                    max(week) week_num,count(distinct site_id) total_sites,
                                     sum(case
                                         when (packetloss_status = 'CONSECUTIVE') then 1
                                         else 0 end
                                      ) site_not_clear
                                     from ci_twamp.twamp_4g_weekly
                              where week = (select max(week) from ci_twamp.twamp_4g_weekly)
                              and city_cluster = 'Non BB City'
                              group by 1,2 order by id_region_tsel,region_tsel
             ) s join master.region_sla_target t on s.id_region_tsel=t.id_region_tsel and s.region=concat(t.id_region_tsel,'-',t.region_tsel)
             where t.city_cluster = 'Non BB City' and sla_group='pl-nbbc' order by 1,2";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $db->close();

                echo json_encode(['status' => 200, 'data' => $a]);
            }
            break;
        case 'weekly-sla-latency':
            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $db = $conn_res->conn;
                $q = "select s.*,t.target_sla,round((1-(site_not_clear/total_sites))*100,2) realisasi,
                round(((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites) site_clear_hijau,
                round((t.target_sla/100) * s.total_sites) site_clear_kuning,
                round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) batas_site_not_clear_hijau,
                round(total_sites - ((t.target_sla/100) * s.total_sites)) batas_site_not_clear_kuning,
                concat('< ',round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1) toleransi_site_not_clear_hijau,
                concat(round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1,' - ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_kuning,
                concat('> ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_merah
         from (
             select id_region_tsel,concat(id_region_tsel,'-',region_tsel) region,
                    max(week) week_num,count(distinct site_id) total_sites,
                                     sum(case
                                         when (latency_status != 'CLEAR') then 1
                                         else 0 end
                                      ) site_not_clear
                                     from ci_twamp.twamp_4g_weekly
                              where week = (select max(week) from ci_twamp.twamp_4g_weekly)                              
                              group by 1,2 order by id_region_tsel,region_tsel
             ) s join master.region_sla_target t on s.id_region_tsel=t.id_region_tsel and s.region=concat(t.id_region_tsel,'-',t.region_tsel)
             where sla_group='latency' order by 1,2";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $db->close();

                echo json_encode(['status' => 200, 'data' => $a]);
            }
            break;
        case 'weekly-sla-jitter':
            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $db = $conn_res->conn;
                $q = "select s.*,t.target_sla,round((1-(site_not_clear/total_sites))*100,2) realisasi,
                round(((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites) site_clear_hijau,
                round((t.target_sla/100) * s.total_sites) site_clear_kuning,
                round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) batas_site_not_clear_hijau,
                round(total_sites - ((t.target_sla/100) * s.total_sites)) batas_site_not_clear_kuning,
                concat('< ',round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1) toleransi_site_not_clear_hijau,
                concat(round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1,' - ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_kuning,
                concat('> ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_merah
         from (
             select id_region_tsel,concat(id_region_tsel,'-',region_tsel) region,
                    max(week) week_num,count(distinct site_id) total_sites,
                                     sum(case
                                         when (jitter_status != 'CLEAR') then 1
                                         else 0 end
                                      ) site_not_clear
                                     from ci_twamp.twamp_4g_weekly
                              where week = (select max(week) from ci_twamp.twamp_4g_weekly)                               
                              group by 1,2 order by id_region_tsel,region_tsel
             ) s join master.region_sla_target t on s.id_region_tsel=t.id_region_tsel and s.region=concat(t.id_region_tsel,'-',t.region_tsel)
             where sla_group='jitter' order by 1,2";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $db->close();

                echo json_encode(['status' => 200, 'data' => $a]);
            }
            break;

        case 'wow-site-not-clear-chart':
            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $db = $conn_res->conn;
                $data = array(
                    'national' => [], 'treg' => [], 'region' => []
                );
                $q = "select tanggal,count(distinct site_id) total_sites,
                    sum(case when (packetloss_status = 'CONSECUTIVE' OR latency_status!='CLEAR' OR jitter_status!='CLEAR') then 1 else 0 end) site_not_clear
                                     from ci_twamp.twamp_4g_weekly
                              where week > (select max(week) from ci_twamp.twamp_4g_weekly) - 11 and week <= (select max(week) from ci_twamp.twamp_4g_weekly)
                              group by 1 order by 1";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();

                $data['national'] = $a;

                $q = "select region,tanggal,count(distinct site_id) total_sites
                    ,sum(case when (packetloss_status = 'CONSECUTIVE' OR latency_status!='CLEAR' OR jitter_status!='CLEAR') then 1 else 0 end) site_not_clear
                                     from ci_twamp.twamp_4g_weekly
                              where week > (select max(week) from ci_twamp.twamp_4g_weekly) - 11 and week <= (select max(week) from ci_twamp.twamp_4g_weekly)
                              group by 1,2 order by 1,2";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $data['treg'] = $a;

                $q = "select concat(id_region_tsel,'-',region_tsel) region,tanggal,count(distinct site_id) total_sites
                    ,sum(case when (packetloss_status = 'CONSECUTIVE' OR latency_status!='CLEAR' OR jitter_status!='CLEAR') then 1 else 0 end) site_not_clear
                                     from ci_twamp.twamp_4g_weekly
                              where week > (select max(week) from ci_twamp.twamp_4g_weekly) - 11 and week <= (select max(week) from ci_twamp.twamp_4g_weekly)
                              group by 1,2 order by id_region_tsel,2";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $db->close();
                $data['region'] = $a;

                echo json_encode(['status' => 200, 'data' => $data]);
            }
            break;

        case 'wow-kpi-zona-merah':
            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                // PL BBC
                $db = $conn_res->conn;
                $data = array(
                    'pl bbc' => [], 'pl nbbc' => [], 'latency' => [], 'jitter' => []
                );
                $q = "select week_num,sum(case when site_not_clear > toleransi_site_not_clear_merah_num then 1 else 0 end) region_not_clear from (
                    select s.*,t.target_sla,round((1-(site_not_clear/total_sites))*100,2) realisasi,
                                    round(((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites) site_clear_hijau,
                                    round((t.target_sla/100) * s.total_sites) site_clear_kuning,
                                    round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) batas_site_not_clear_hijau,
                                    round(total_sites - ((t.target_sla/100) * s.total_sites)) batas_site_not_clear_kuning,
                                    concat('< ',round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1) toleransi_site_not_clear_hijau,
                                    concat(round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1,' - ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_kuning,
                                    concat('> ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_merah,
                                    round(total_sites - ((t.target_sla/100) * s.total_sites)) toleransi_site_not_clear_merah_num
                             from (
                                 select id_region_tsel,
                                     case when id_region_tsel in (4,5,6) then concat(id_region_tsel,'-',region_tsel,case when io=1 then ' INNER' else ' OUTER' end)
                                     else concat(id_region_tsel,'-',region_tsel) end region,
                                        week week_num,count(distinct site_id) total_sites,
                                                         sum(case
                                                             when (packetloss_status = 'CONSECUTIVE') then 1
                                                             else 0 end
                                                          ) site_not_clear
                                                         from ci_twamp.twamp_4g_weekly                                                  
                                                  where week > (select max(week) from ci_twamp.twamp_4g_weekly) - 11 and week <= (select max(week) from ci_twamp.twamp_4g_weekly)
                                                  and city_cluster = 'BB City'
                                                  group by 1,2,3 order by 3,id_region_tsel,region_tsel
                                 ) s join master.region_sla_target t on s.id_region_tsel=t.id_region_tsel and s.region=concat(t.id_region_tsel,'-',t.region_tsel)
                                 where t.city_cluster = 'BB City' and sla_group='pl-bbc' order by 1,2
                    ) xx group by 1 order by 1";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $data['pl bbc'] = $a;

                $q = "select week_num,sum(case when site_not_clear > toleransi_site_not_clear_merah_num then 1 else 0 end) region_not_clear from (
                    select s.*,t.target_sla,round((1-(site_not_clear/total_sites))*100,2) realisasi,
                                    round(((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites) site_clear_hijau,
                                    round((t.target_sla/100) * s.total_sites) site_clear_kuning,
                                    round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) batas_site_not_clear_hijau,
                                    round(total_sites - ((t.target_sla/100) * s.total_sites)) batas_site_not_clear_kuning,
                                    concat('< ',round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1) toleransi_site_not_clear_hijau,
                                    concat(round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1,' - ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_kuning,
                                    concat('> ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_merah,
                                    round(total_sites - ((t.target_sla/100) * s.total_sites)) toleransi_site_not_clear_merah_num
                             from (
                                 select id_region_tsel,concat(id_region_tsel,'-',region_tsel) region,                                     
                                        week week_num,count(distinct site_id) total_sites,
                                                         sum(case
                                                             when (packetloss_status = 'CONSECUTIVE') then 1
                                                             else 0 end
                                                          ) site_not_clear
                                                         from ci_twamp.twamp_4g_weekly                                                  
                                                  where week > (select max(week) from ci_twamp.twamp_4g_weekly) - 11 and week <= (select max(week) from ci_twamp.twamp_4g_weekly)
                                                  group by 1,2,3 order by 3,id_region_tsel,region_tsel
                                 ) s join master.region_sla_target t on s.id_region_tsel=t.id_region_tsel and s.region=concat(t.id_region_tsel,'-',t.region_tsel)
                                 where sla_group='latency' order by 1,2
                    ) xx group by 1 order by 1";


                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $data['pl nbbc'] = $a;

                $q = "select week_num,sum(case when site_not_clear > toleransi_site_not_clear_merah_num then 1 else 0 end) region_not_clear from (
                    select s.*,t.target_sla,round((1-(site_not_clear/total_sites))*100,2) realisasi,
                                    round(((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites) site_clear_hijau,
                                    round((t.target_sla/100) * s.total_sites) site_clear_kuning,
                                    round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) batas_site_not_clear_hijau,
                                    round(total_sites - ((t.target_sla/100) * s.total_sites)) batas_site_not_clear_kuning,
                                    concat('< ',round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1) toleransi_site_not_clear_hijau,
                                    concat(round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1,' - ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_kuning,
                                    concat('> ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_merah,
                                    round(total_sites - ((t.target_sla/100) * s.total_sites)) toleransi_site_not_clear_merah_num
                             from (
                                 select id_region_tsel,concat(id_region_tsel,'-',region_tsel) region,
                                        week week_num,count(distinct site_id) total_sites,
                                                         sum(case
                                                             when (latency_status != 'CLEAR') then 1
                                                             else 0 end
                                                          ) site_not_clear
                                                         from ci_twamp.twamp_4g_weekly
                                                  where week > (select max(week) from ci_twamp.twamp_4g_weekly) - 11 and week <= (select max(week) from ci_twamp.twamp_4g_weekly)
                                                  group by 1,2,3 order by 3,id_region_tsel,region_tsel
                                 ) s join master.region_sla_target t on s.id_region_tsel=t.id_region_tsel and s.region=concat(t.id_region_tsel,'-',t.region_tsel)
                                 where sla_group='latency' order by 1,2
                    ) xx group by 1 order by 1";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $data['latency'] = $a;

                $q = "select week_num,sum(case when site_not_clear > toleransi_site_not_clear_merah_num then 1 else 0 end) region_not_clear from (
                    select s.*,t.target_sla,round((1-(site_not_clear/total_sites))*100,2) realisasi,
                                    round(((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites) site_clear_hijau,
                                    round((t.target_sla/100) * s.total_sites) site_clear_kuning,
                                    round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) batas_site_not_clear_hijau,
                                    round(total_sites - ((t.target_sla/100) * s.total_sites)) batas_site_not_clear_kuning,
                                    concat('< ',round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1) toleransi_site_not_clear_hijau,
                                    concat(round(total_sites - (((t.target_sla+t.add_th_lower_green_clear)/100) * s.total_sites)) + 1,' - ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_kuning,
                                    concat('> ',round(total_sites - ((t.target_sla/100) * s.total_sites))) toleransi_site_not_clear_merah,
                                    round(total_sites - ((t.target_sla/100) * s.total_sites)) toleransi_site_not_clear_merah_num
                             from (
                                 select id_region_tsel,concat(id_region_tsel,'-',region_tsel) region,
                                        week week_num,count(distinct site_id) total_sites,
                                                         sum(case
                                                             when (jitter_status != 'CLEAR') then 1
                                                             else 0 end
                                                          ) site_not_clear
                                                         from ci_twamp.twamp_4g_weekly
                                                  where week > (select max(week) from ci_twamp.twamp_4g_weekly) - 11 and week <= (select max(week) from ci_twamp.twamp_4g_weekly)
                                                  group by 1,2,3 order by 3,id_region_tsel,region_tsel
                                 ) s join master.region_sla_target t on s.id_region_tsel=t.id_region_tsel and s.region=concat(t.id_region_tsel,'-',t.region_tsel)
                                 where sla_group='jitter' order by 1,2
                    ) xx group by 1 order by 1";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $data['jitter'] = $a;

                $db->close();
                echo json_encode(['status' => 200, 'data' => $data]);
            }
            break;

        case 'monthly-ach-sla-pl-bbc':

            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $backInterval = isset($_GET['backinterval']) ? $_GET['backinterval'] : 4;
                $db = $conn_res->conn;
                $q = "select s.bulan,s.id_region_tsel,s.region,t.target_sla,round((1-(site_not_clear/total_sites))*100,2) realisasi,
                round((round((1-(site_not_clear/total_sites))*100,2) / t.target_sla) * 100,2) achv 
             from (
                 select date_format(tanggal,'%Y-%m-01') bulan,id_region_tsel,
                 case when id_region_tsel in (4,5,6) then concat(id_region_tsel,'-',region_tsel,case when io=1 then ' INNER' else ' OUTER' end)
                 else concat(id_region_tsel,'-',region_tsel) end region,
                 count(distinct site_id) total_sites,
                                         sum(case
                                             when (packetloss_status = 'CONSECUTIVE') then 1 
                                             else 0 end
                                          ) site_not_clear
                                         from ci_twamp.twamp_4g_weekly
                                         where tanggal > date_format(date_sub(now(), interval " . $backInterval . " month),'%Y-%m-01') 
                                  and city_cluster = 'BB City'
                                  group by 1,2 order by id_region_tsel,region_tsel
                 ) s join master.region_sla_target t on s.id_region_tsel=t.id_region_tsel and s.region=concat(t.id_region_tsel,'-',t.region_tsel) 
                 where t.city_cluster = 'BB City' and sla_group='pl-bbc' order by 1,2";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $db->close();

                echo json_encode(['status' => 200, 'data' => $a]);
            }
            break;
        case 'monthly-ach-sla-pl-nbbc':

            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $backInterval = isset($_GET['backinterval']) ? $_GET['backinterval'] : 4;
                $db = $conn_res->conn;
                $q = "select s.bulan,s.id_region_tsel,s.region,t.target_sla,round((1-(site_not_clear/total_sites))*100,2) realisasi,
                round((round((1-(site_not_clear/total_sites))*100,2) / t.target_sla) * 100,2) achv 
                 from (
                     select date_format(tanggal,'%Y-%m-01') bulan,id_region_tsel,concat(id_region_tsel,'-',region_tsel) region,count(distinct site_id) total_sites,
                                             sum(case
                                                 when (packetloss_status = 'CONSECUTIVE') then 1
                                                 else 0 end
                                              ) site_not_clear
                                             from ci_twamp.twamp_4g_weekly
                                             where tanggal > date_format(date_sub(now(), interval " . $backInterval . " month),'%Y-%m-01') 
                                      and city_cluster = 'Non BB City'
                                      group by 1,2 order by id_region_tsel,region_tsel
                     ) s join master.region_sla_target t on s.id_region_tsel=t.id_region_tsel and s.region=concat(t.id_region_tsel,'-',t.region_tsel) 
                     where t.city_cluster = 'Non BB City' and sla_group='pl-nbbc' order by 1,2";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $db->close();

                echo json_encode(['status' => 200, 'data' => $a]);
            }
            break;
        case 'monthly-ach-sla-latency':

            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $backInterval = isset($_GET['backinterval']) ? $_GET['backinterval'] : 4;
                $db = $conn_res->conn;
                $q = "select s.bulan,s.id_region_tsel,s.region,t.target_sla,round((1-(site_not_clear/total_sites))*100,2) realisasi,
                round((round((1-(site_not_clear/total_sites))*100,2) / t.target_sla) * 100,2) achv 
                     from (
                         select date_format(tanggal,'%Y-%m-01') bulan,id_region_tsel,concat(id_region_tsel,'-',region_tsel) region,count(distinct site_id) total_sites,
                                                 sum(case
                                                     when (latency_status != 'CLEAR') then 1
                                                     else 0 end
                                                  ) site_not_clear
                                                 from ci_twamp.twamp_4g_weekly
                                                 where tanggal > date_format(date_sub(now(), interval " . $backInterval . " month),'%Y-%m-01')                      
                                          group by 1,2 order by id_region_tsel,region_tsel
                         ) s join master.region_sla_target t on s.id_region_tsel=t.id_region_tsel and s.region=concat(t.id_region_tsel,'-',t.region_tsel) 
                         where sla_group='latency' order by 1,2";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $db->close();

                echo json_encode(['status' => 200, 'data' => $a]);
            }
            break;
        case 'monthly-ach-sla-jitter':

            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $backInterval = isset($_GET['backinterval']) ? $_GET['backinterval'] : 4;
                $db = $conn_res->conn;
                $q = "select s.bulan,s.id_region_tsel,s.region,t.target_sla,round((1-(site_not_clear/total_sites))*100,2) realisasi,
                round((round((1-(site_not_clear/total_sites))*100,2) / t.target_sla) * 100,2) achv 
                         from (
                             select date_format(tanggal,'%Y-%m-01') bulan,id_region_tsel,concat(id_region_tsel,'-',region_tsel) region,count(distinct site_id) total_sites,
                                                     sum(case
                                                         when (jitter_status != 'CLEAR') then 1
                                                         else 0 end
                                                      ) site_not_clear
                                                     from ci_twamp.twamp_4g_weekly
                                                     where tanggal > date_format(date_sub(now(), interval " . $backInterval . " month),'%Y-%m-01')                                           
                                              group by 1,2 order by id_region_tsel,region_tsel
                             ) s join master.region_sla_target t on s.id_region_tsel=t.id_region_tsel and s.region=concat(t.id_region_tsel,'-',t.region_tsel) 
                             where sla_group='jitter' order by 1,2";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                $db->close();

                echo json_encode(['status' => 200, 'data' => $a]);
            }
            break;
        case 'service-credit':

            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $periode = isset($_GET['periode']) ? $_GET['periode'] : '23-Jan';
                $data = array(
                    'bar' => [],
                    'line' => []
                );
                $db = $conn_res->conn;
                $q = "select sub_kpi,sum(cast(replace(replace(value,',',''),'-',0) as int)) val                
                from ci.servic_credit where period='" . $periode . "'
                and sub_kpi in ('Packet Loss','Latency','Jitter') group by 1";

                $q = $db->query($q);


                while ($b = $q->fetch_assoc()) {
                    $data['bar'][] = $b;
                }
                $q->free_result();

                $q = "select date_format(str_to_date(period,'%Y-%M'),'%Y-%m-01') period,sum(cast(replace(replace(value,',',''),'-',0) as int)) val
                from ci.servic_credit where sub_kpi in ('Packet Loss','Latency','Jitter')
                and str_to_date(period,'%Y-%M') >= '" . $periode . "' group by 1 order by 1 desc;";

                $q = $db->query($q);


                while ($b = $q->fetch_assoc()) {
                    $data['line'][] = $b;
                }
                $q->free_result();

                $db->close();

                echo json_encode(['status' => 200, 'data' => $data]);
            }
            break;

        case 'cx-experience':

            $conn_res = connect_dbtutela();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => 'cannot connect to DB']);
            } else {
                $data = [];
                $db = $conn_res->conn;
                $q = "select yearweek,winner,count(winner) total_win from production.report.v_tutela_benchmark_packetloss_mobile_weekly_kabupaten
                    where yearweek=(select max(yearweek) from production.report.v_tutela_benchmark_packetloss_mobile_weekly_kabupaten)
                    and winner is not null
                    group by 1,2 order by 3 desc limit 1";

                $result = pg_query($db, $q);

                $a = [];
                while ($b = pg_fetch_assoc($result)) {
                    $a[] = $b;
                }
                pg_free_result($result);
                $data['pl'] = $a[0]['winner'];

                $q = "select yearweek,winner,count(winner) total_win from production.report.v_tutela_benchmark_latency_mobile_weekly_kabupaten
                    where yearweek=(select max(yearweek) from production.report.v_tutela_benchmark_latency_mobile_weekly_kabupaten)
                    and winner is not null
                    group by 1,2 order by 3 desc limit 1";

                $result = pg_query($db, $q);


                $a = [];
                while ($b = pg_fetch_assoc($result)) {
                    $a[] = $b;
                }
                $data['latency'] = $a[0]['winner'];
                pg_free_result($result);

                $q = "select yearweek,winner,count(winner) total_win from production.report.v_tutela_benchmark_jitter_mobile_weekly_kabupaten
                    where yearweek=(select max(yearweek) from production.report.v_tutela_benchmark_jitter_mobile_weekly_kabupaten)
                    and winner is not null
                    group by 1,2 order by 3 desc limit 1";

                $result = pg_query($db, $q);

                $a = [];
                while ($b = pg_fetch_assoc($result)) {
                    $a[] = $b;
                }
                $data['jitter'] = $a[0]['winner'];
                pg_free_result($result);

                $q = "select yearweek,winner,count(winner) total_win from production.report.v_tutela_benchmark_game_parameter_mobile_weekly_kabupaten
                    where yearweek=(select max(yearweek) from production.report.v_tutela_benchmark_game_parameter_mobile_weekly_kabupaten)
                    and winner is not null
                    group by 1,2 order by 3 desc limit 1";

                $result = pg_query($db, $q);

                $a = [];
                while ($b = pg_fetch_assoc($result)) {
                    $a[] = $b;
                }
                $data['gamescore'] = $a[0]['winner'];
                pg_free_result($result);

                $q = "select yearweek,winner,count(winner) total_win from production.report.v_tutela_benchmark_vs_netflix_mobile_weekly_kabupaten
                    where yearweek=(select max(yearweek) from production.report.v_tutela_benchmark_vs_netflix_mobile_weekly_kabupaten)
                    and winner is not null
                    group by 1,2 order by 3 desc limit 1";

                $result = pg_query($db, $q);

                $a = [];
                while ($b = pg_fetch_assoc($result)) {
                    $a[] = $b;
                }
                $data['videoscore'] = $a[0]['winner'];
                pg_free_result($result);

                $q = "select yearweek,winner,count(winner) total_win from production.report.v_tutela_benchmark_vs_netflix_mobile_weekly_kabupaten
                where yearweek=(select max(yearweek) from production.report.v_tutela_benchmark_vs_netflix_mobile_weekly_kabupaten)
                and winner is not null
                group by 1,2 order by 3 desc limit 1";

                $result = pg_query($db, $q);

                $a = [];
                while ($b = pg_fetch_assoc($result)) {
                    $a[] = $b;
                }
                $data['signalstrength'] = $a[0]['winner'];
                pg_free_result($result);

                pg_close($db);

                echo json_encode(['status' => 200, 'data' => $data]);
            }
            break;
        case 'global-vs-cdn-ex':

            $conn_res = connect_telkomoca();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => 'cannot connect to DB']);
            } else {
                $data = [];
                $db = $conn_res->conn;
                $q = "select date_,type,category,avg(avg) avg_time from ping_automate.latency_oca
                where type in ('global','cdn') and category in ('youtube','tiktok','facebook','netflix')
                # and date_=date(date_sub(now(), interval 1 day))
                group by 1,2,3 order by 1";

                $q = $db->query($q);

                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                }
                $q->free_result();
                #$data['pl bbc'] = $a;

                echo json_encode(['status' => 200, 'data' => $a]);
            }
            break;
        case 'city-lose-performance-donut':

            $conn_res = connect_dbtutela();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => 'cannot connect to DB']);
            } else {
                $data = array('latency' => [], 'pl' => [], 'jitter' => []);
                $db = $conn_res->conn;
                $q = "select status,count(*) from (
                    select *,
                        case
                            when pct_lose >= 0 and pct_lose <= 10 then 'platinum'
                            when pct_lose > 10 and pct_lose <= 20 then 'gold'
                            when pct_lose > 20 and pct_lose <= 30 then 'silver'
                            when pct_lose > 30 then 'bronze'
                    end status
                    from (
                        select b.*,
                               cast(total_lose as float) / cast(total_rec as float)*100 pct_lose
                            from (
                            select region,count(*) total_rec,
                                   sum(case when benchmark='lose' then 1 else 0 end) total_lose
                            from production.report.v_tutela_benchmark_latency_mobile_weekly_kabupaten
                            where yearweek=(select max(yearweek) from production.report.v_tutela_benchmark_latency_mobile_weekly_kabupaten) group by 1
                        ) b
                    ) c
                    ) t group by 1";

                $threshold = [];
                $total = 0;
                $result = pg_query($db, $q);

                $a = [];
                while ($b = pg_fetch_assoc($result)) {
                    $total = $total + $b['count'];
                    $a[] = $b;
                }
                pg_free_result($result);

                $i = 0;
                foreach ($a as $r) {
                    $data['latency'][$i]['status'] = $r['status'];
                    $data['latency'][$i]['count'] = $r['count'];
                    $data['latency'][$i]['pct'] = ($r['count'] / $total) * 100;
                    $i++;
                }

                $q = "select status,count(*) from (
                    select *,
                        case
                            when pct_lose >= 0 and pct_lose <= 10 then 'platinum'
                            when pct_lose > 10 and pct_lose <= 20 then 'gold'
                            when pct_lose > 20 and pct_lose <= 30 then 'silver'
                            when pct_lose > 30 then 'bronze'
                    end status
                    from (
                        select b.*,
                               cast(total_lose as float) / cast(total_rec as float)*100 pct_lose
                            from (
                            select region,count(*) total_rec,
                                   sum(case when benchmark='lose' then 1 else 0 end) total_lose
                            from production.report.v_tutela_benchmark_packetloss_mobile_weekly_kabupaten
                            where yearweek=(select max(yearweek) from production.report.v_tutela_benchmark_packetloss_mobile_weekly_kabupaten) group by 1
                        ) b
                    ) c
                    ) t group by 1";

                $threshold = [];
                $total = 0;
                $result = pg_query($db, $q);

                $a = [];
                while ($b = pg_fetch_assoc($result)) {
                    $total = $total + $b['count'];
                    $a[] = $b;
                }
                pg_free_result($result);

                $i = 0;
                foreach ($a as $r) {
                    $data['pl'][$i]['status'] = $r['status'];
                    $data['pl'][$i]['count'] = $r['count'];
                    $data['pl'][$i]['pct'] = ($r['count'] / $total) * 100;
                    $i++;
                }

                $q = "select status,count(*) from (
                    select *,
                        case
                            when pct_lose >= 0 and pct_lose <= 10 then 'platinum'
                            when pct_lose > 10 and pct_lose <= 20 then 'gold'
                            when pct_lose > 20 and pct_lose <= 30 then 'silver'
                            when pct_lose > 30 then 'bronze'
                    end status
                    from (
                        select b.*,
                               cast(total_lose as float) / cast(total_rec as float)*100 pct_lose
                            from (
                            select region,count(*) total_rec,
                                   sum(case when benchmark='lose' then 1 else 0 end) total_lose
                            from production.report.v_tutela_benchmark_jitter_mobile_weekly_kabupaten
                            where yearweek=(select max(yearweek) from production.report.v_tutela_benchmark_jitter_mobile_weekly_kabupaten) group by 1
                        ) b
                    ) c
                    ) t group by 1";

                $threshold = [];
                $total = 0;
                $result = pg_query($db, $q);

                $a = [];
                while ($b = pg_fetch_assoc($result)) {
                    $total = $total + $b['count'];
                    $a[] = $b;
                }
                pg_free_result($result);

                $i = 0;
                foreach ($a as $r) {
                    $data['jitter'][$i]['status'] = $r['status'];
                    $data['jitter'][$i]['count'] = $r['count'];
                    $data['jitter'][$i]['pct'] = ($r['count'] / $total) * 100;
                    $i++;
                }

                pg_close($db);
                echo json_encode(['status' => 200, 'data' => $data]);
            }
            break;
        case 'city-lose-performance-line':

            $conn_res = connect_dbtutela();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => 'cannot connect to DB']);
            } else {
                $data = array('latency' => [], 'pl' => [], 'jitter' => []);
                $db = $conn_res->conn;
                $q = "select yearweek,avg(telkomsel) avg_val
                from production.report.v_tutela_benchmark_latency_mobile_weekly_kabupaten
                where yearweek > '202404'
                group by 1 order by 1";

                $threshold = [];
                $total = 0;
                $result = pg_query($db, $q);

                $a = [];
                while ($b = pg_fetch_assoc($result)) {
                    $total = $total + $b['count'];
                    $a[] = $b;
                }
                pg_free_result($result);
                $data['latency'] = $a;


                $q = "select yearweek,avg(telkomsel) avg_val
                from production.report.v_tutela_benchmark_packetloss_mobile_weekly_kabupaten
                where yearweek > '202404'
                group by 1 order by 1";

                $threshold = [];
                $total = 0;
                $result = pg_query($db, $q);

                $a = [];
                while ($b = pg_fetch_assoc($result)) {
                    $total = $total + $b['count'];
                    $a[] = $b;
                }
                pg_free_result($result);
                $data['pl'] = $a;

                $q = "select yearweek,avg(telkomsel) avg_val
                from production.report.v_tutela_benchmark_jitter_mobile_weekly_kabupaten
                where yearweek > '202404'
                group by 1 order by 1";

                $threshold = [];
                $total = 0;
                $result = pg_query($db, $q);

                $a = [];
                while ($b = pg_fetch_assoc($result)) {
                    $total = $total + $b['count'];
                    $a[] = $b;
                }
                pg_free_result($result);
                $data['jitter'] = $a;
                pg_close($db);
                echo json_encode(['status' => 200, 'data' => $data]);
            }
            break;
        case 'sla-performance':
            $data = array(
                '4g' => array('pl' => [], 'lat' => [], 'jitt' => []),
                'cti' => array('pl' => [], 'lat' => [], 'jitt' => []),
            );

            $data['4g']['pl'] = sla_performance_4g('packetloss');
            $data['4g']['lat'] = sla_performance_4g("latency");
            $data['4g']['jitt'] = sla_performance_4g("jitter");

            $cti = sla_performance_cti();
            $data = array_merge($data, $cti);
            echo json_encode(['status' => 200, 'data' => $data]);
            break;
        case 'network-performance':
            $data = array(
                '4g' => array('pl' => [], 'lat' => [], 'jitt' => []),
                'cti' => array('pl' => [], 'lat' => [], 'jitt' => []),
            );

            $conn_res = connect_dbtelkomtwamp();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
                exit(0);
            } else {
                $backInterval = isset($_GET['backinterval']) ? $_GET['backinterval'] : 4;
                $db = $conn_res->conn;
                $q = "select region,site_not_clear,total_sites,((site_not_clear/total_sites)*100) pct_not_clear,
                case
                    when ((site_not_clear/total_sites)*100) >= 0 and ((site_not_clear/total_sites)*100) <= 5 then 'excellence'
                    when ((site_not_clear/total_sites)*100) > 5 and ((site_not_clear/total_sites)*100) <= 10 then 'Good'
                    when ((site_not_clear/total_sites)*100) > 10 and ((site_not_clear/total_sites)*100) <= 15 then 'Fair'
                    when ((site_not_clear/total_sites)*100) > 15 then 'Poor/Bad'
                end status
                from (
                select region,
                       count(distinct site_id) total_sites,
                       sum(case
                               when (packetloss_status = 'CONSECUTIVE' OR latency_status != 'CLEAR' OR jitter_status != 'CLEAR') then 1
                               else 0 end)     site_not_clear
                from ci_twamp.twamp_4g_weekly
                where week = (select max(week) from ci_twamp.twamp_4g_weekly)
                group by 1
                order by 1
                ) xx ";

                $q = $db->query($q);

                $data = array(
                    'detail' => [],
                    'summary' => array('total_sites' => 0, 'site_not_clear' => 0)
                );
                $a = [];
                while ($b = $q->fetch_assoc()) {
                    $a[] = $b;
                    $data['detail'][] = $b;
                    $data['summary']['total_sites'] += $b['total_sites'];
                    $data['summary']['site_not_clear'] += $b['site_not_clear'];
                }
                $q->free_result();
                $db->close();
                echo json_encode(['status' => 200, 'data' => $data]);
            }

            break;
        case 'site-profile':
            $data = [];

            $data['pl'] = site_profiling();
            $data['lat'] = site_profiling("latency_status != 'CLEAR'");
            $data['jitt'] = site_profiling("jitter_status != 'CLEAR'");

            echo json_encode(['status' => 200, 'data' => $data]);
            break;
        case 'total-gamas-impacted':

            $conn_res = connect_dbnossa();
            if (!$conn_res->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $db = $conn_res->conn;
                $data = array('gamas' => 0, 'impacted_sites' => 0);
                $from = isset($_GET['from']) ? $_GET['from'] : '2024-01-14';
                $to = isset($_GET['to']) ? $_GET['to'] : '2024-01-21';
                $q = "select count(*) total from cnq.nossa_telkomsel
                where trouble_headline like '%RECOVERY%'
                -- and creationdate >= date(date_sub(now(),INTERVAL 1 WEEK)) and creationdate < date(now())
                and creationdate >= '$from' and creationdate < '$to'";
                $q = $db->query($q);

                while ($b = $q->fetch_assoc()) {
                    $data['gamas'] = $b['total'];
                }
                $q->free_result();

                // extract impacted metro
                $metros = [];
                $q = "select trim(replace(m1,'METRO','')) me1,trim(replace(m2,'TO','')) me2,trouble_headline from (
                    SELECT regexp_substr(trouble_headline,'METRO ME([0-9]?)-[^ ]+') m1,
                           regexp_substr(trouble_headline,' TO ME([0-9]?)-[^ ]+') m2,
                           trouble_headline
                    from cnq.nossa_telkomsel 
                    -- where ticketid in ('IN170667254','IN170676691','IN170656857')
                    where trouble_headline like '%RECOVERY%'
                    and creationdate >= '$from' and creationdate <= '$to'
                    ) x";

                $q = $db->query($q);

                while ($b = $q->fetch_assoc()) {
                    $metros[] = $b['me1'];
                    $metros[] = $b['me2'];
                }
                $q->free_result();
                $db->close();

                $str_metros = "'" . implode("','", $metros) . "'";

                // get list site_id 
                $conn_res = connect_dbtelkomtwamp();
                if (!$conn_res->success) {
                    echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
                } else {
                    $db = $conn_res->conn;
                    $sites = [];
                    $q = "select distinct site_id from ci.mapping_and_to_end
                    where (metro in ($str_metros) or metro_9 in ($str_metros))";
                    $q = $db->query($q);

                    while ($b = $q->fetch_assoc()) {
                        $sites[] = $b['site_id'];
                    }
                    $q->free_result();

                    // count impacted sites
                    $str_sites = "'" . implode("','", $sites) . "'";
                    $sql = "select sum(case when (packetloss_status = 'CONSECUTIVE' OR latency_status!='CLEAR') then 1 else 0 end) site_not_clear from ci_twamp.twamp_4g_weekly where tanggal >= '$from' and tanggal <= '$to' and site_id in ($str_sites) ";

                    $q = $db->query($sql);

                    while ($b = $q->fetch_assoc()) {
                        $data['impacted_sites'] = $b['site_not_clear'];
                    }
                    $q->free_result();
                    $db->close();
                }
                echo json_encode(['status' => 200, 'data' => $data, 'q_impacted_sites' => $sql]);
            }
            break;
        default:
            echo json_encode(['status' => 400, 'msg' => 'unknown cmd ' . $_GET['cmd']]);
            break;
    }
} else {
    echo json_encode(['status' => 400, 'msg' => 'Bad Request']);
}


function site_profiling($var = "packetloss_status = 'CONSECUTIVE'")
{
    $conn_res = connect_dbtelkomtwamp();
    if (!$conn_res->success) {
        echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
        exit(0);
    } else {
        $backInterval = isset($_GET['backinterval']) ? $_GET['backinterval'] : 4;
        $db = $conn_res->conn;
        $q = "select site_not_clear,total_sites,((site_not_clear/total_sites)*100) pct_not_clear
        from (
        select count(distinct site_id) total_sites,
               sum(case
                       when ($var) then 1
                       else 0 end)     site_not_clear
        from ci_twamp.twamp_4g_weekly
        where week = (select max(week) from ci_twamp.twamp_4g_weekly)
        order by 1
        ) xx";

        $q = $db->query($q);

        $a = [];
        while ($b = $q->fetch_assoc()) {
            $a[] = $b;
        }
        $q->free_result();

        $db->close();
        return $a;
    }
}
function sla_performance_4g($var = "packetloss")
{
    $conn_res = connect_dbtelkomtwamp();
    if (!$conn_res->success) {
        echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
        exit(0);
    } else {
        if ($var == 'packetloss') {
            $var = "packetloss_status = 'CONSECUTIVE'";
            $sla_group = " and tg.sla_group='pl-nbbc' ";
        } elseif ($var == 'latency') {
            $var = "latency_status != 'CLEAR'";
            $sla_group = " and tg.sla_group='latency' ";
        } elseif ($var == 'jitter') {
            $var = "jitter_status != 'CLEAR'";
            $sla_group = " and tg.sla_group='latency' ";
        }

        $backInterval = isset($_GET['backinterval']) ? $_GET['backinterval'] : 4;
        $db = $conn_res->conn;
        $q = "select bulan periode,
        target_sla,
        round((1 - (site_not_clear / total_sites)) * 100, 2) realisasi
 from (select date_format(tanggal, '%Y-%m-01') bulan,
        99.45 as                         target_sla,
              count(distinct site_id)          total_sites,
              sum(case
                      when ($var) then 1
                      else 0 end
                  )                            site_not_clear
       from ci_twamp.twamp_4g_weekly 
       -- w join master.region_sla_target tg on w.id_region_tsel=tg.id_region_tsel 
       where tanggal > date_sub(now(), interval 7 month) 
       group by 1, 2 order by 1,2) s
 order by 1";

        $q = $db->query($q);

        $a = [];
        while ($b = $q->fetch_assoc()) {
            $a[] = $b;
        }
        $q->free_result();

        $db->close();
        return $a;
    }
}
function sla_performance_cti($var = "packetloss_status = 'CONSECUTIVE'", $start_date = " date_format(now(), '%Y-%m-01') ")
{
    $conn_res = connect_dbtelkomtwamp();
    if (!$conn_res->success) {
        echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
        exit(0);
    } else {
        $backInterval = isset($_GET['backinterval']) ? $_GET['backinterval'] : 4;
        $db = $conn_res->conn;
        // $date_range = $start_date ? 

        $q = "select month_period,99.45 as tgt_pl, (pl_clear / total_sites)*100 real_pl,
        99.45 as tgt_lat, (lat_clear / total_sites)*100 real_lat,
         99.45 as tgt_jit, (jitt_clear / total_sites)*100 real_jitt
 from (
 select month_period,count(*) total_sites,
        sum(case when pl_status='clear' then 1 else 0 end) pl_clear,
        sum(case when lat_status='clear' then 1 else 0 end) lat_clear,
        sum(case when jitt_status='clear' then 1 else 0 end) jitt_clear
 from (
 select *,
        case when avg_pl < t_pl then 'clear' else 'not clear' end pl_status,
        case when avg_lat < t_lat then 'clear' else 'not clear' end lat_status,
        case when avg_jitt < t_jitt then 'clear' else 'not clear' end jitt_status
 from (
 select r.id_region_tsel,
              r.tahun,
              r.month_period,
              r.verifier_code,
              r.avg_pl,
              r.avg_lat,
              r.avg_jitt,
              t.t_pl,
              t.t_jitt,
              case when r.verifier_code = 'PNK' then t_lat_mnd else t_lat_btm end t_lat
       from (select id_region_tsel,
                    year(date)                    tahun,
                    date_format(date, '%Y-%m-01') month_period,
                    verifier_code,
                    avg(packetloss)               avg_pl,
                    avg(latency / 1000)           avg_lat,
                    avg(jitter / 100)             avg_jitt
             from ci_bk.brix_cti
             where date > date_sub(now(), interval 7 month) 
             group by 1, 2, 3, 4
             order by 1, 2, 3, 4) r
                join (select id_region_tsel,
                             year,
                             avg(threshold_packetloss)     t_pl,
                             avg(threshold_jitter)         t_jitt,
                             avg(threshold_latency_batam)  t_lat_btm,
                             avg(threshold_latency_manado) t_lat_mnd
                      from ci_bk.brix_target_cti
                      group by 1, 2) t on r.id_region_tsel = t.id_region_tsel and r.tahun = t.year
       group by 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
 ) tf
 ) xx group by 1
 ) xxx group by 1";

        $q = $db->query($q);

        $data['cti']['pl'] = [];
        $data['cti']['lat'] = [];
        $data['cti']['jitt'] = [];
        $i = 0;
        while ($b = $q->fetch_assoc()) {
            // $a[] = $b;
            $data['cti']['pl'][$i]['periode'] = $b['month_period'];
            $data['cti']['pl'][$i]['target_sla'] = $b['tgt_pl'];
            $data['cti']['pl'][$i]['realisasi'] = $b['real_pl'];

            $data['cti']['lat'][$i]['periode'] = $b['month_period'];
            $data['cti']['lat'][$i]['target_sla'] = $b['tgt_lat'];
            $data['cti']['lat'][$i]['realisasi'] = $b['real_lat'];

            $data['cti']['jitt'][$i]['periode'] = $b['month_period'];
            $data['cti']['jitt'][$i]['target_sla'] = $b['tgt_jit'];
            $data['cti']['jitt'][$i]['realisasi'] = $b['real_jitt'];
            $i++;
        }
        $q->free_result();

        $db->close();
        return $data;
    }
}

function db_connect($dbn = 'nossa')
{
    $res = new stdClass();
    $db = null;
    switch ($dbn) {
        case 'nossa':
            $db = new mysqli("10.62.175.157", "admapp", "4dm1N4Pp5!!", "qosmo");
            break;
        case 'telkom-twamp':
            $db = new mysqli("10.32.16.10", "telkom", "telkom@!234", "ci_twamp");
            break;
        default:
            $db = null;
            break;
    }

    if ($db) {
        $res->success = true;
        $res->conn = $db;
    } else {
        $res->success = false;
        $res->msg = $db->connect_error;
    }
    return $res;
}
function connect_dbnossa()
{
    $res = new stdClass();
    $db = new mysqli("10.62.175.157", "admapp", "4dm1N4Pp5!!", "qosmo");
    if ($db) {
        $res->success = true;
        $res->conn = $db;
    } else {
        $res->success = false;
        $res->msg = $db->connect_error;
    }
    return $res;
}

function connect_dbtelkomtwamp()
{
    $res = new stdClass();
    $db = new mysqli("10.32.16.10", "telkom", "telkom@!234", "ci_twamp");
    if ($db) {
        $res->success = true;
        $res->conn = $db;
    } else {
        $res->success = false;
        $res->msg = $db->connect_error;
    }
    return $res;
}
function connect_dbtutela()
{
    $res = new stdClass();
    $conn_string = "host=10.62.205.124 port=5432 dbname=production user=dso_postgres password=telkom123";
    $dbconn = pg_connect($conn_string);
    if ($dbconn) {
        $res->success = true;
        $res->conn = $dbconn;
    } else {
        $res->success = false;
    }
    return $res;
}

function connect_telkomoca()
{
    $res = new stdClass();
    $db = new mysqli("10.62.165.230", "quality", "admin#QualitY911", "ping_automate");
    if ($db) {
        $res->success = true;
        $res->conn = $db;
    } else {
        $res->success = false;
        $res->msg = $db->connect_error;
    }
    return $res;
}
