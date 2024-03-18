<?php
ini_set('max_execution_time', '600');
error_reporting(E_ALL);
ini_set("display_errors", 1);
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

        case 'brix-target-cti':
            $params['year'] = date('Y');
            $res = curl_post($url, $params);
            echo '<pre>' . print_r($res, 1) . '</pre>';
            if (sizeof($res) > 0) {
                echo '<pre>' . print_r($res, 1) . '</pre>';
            }
            break;

        case 'mart-brix-cti':

            $conn_src = connect_dbtelkomtwamp();
            $conn_dest = connect_dbnossa();
            if (!$conn_src->success) {
                echo json_encode(['status' => 500, 'msg' => $conn_res->msg]);
            } else {
                $dbdest = $conn_dest->conn;
                if (!$conn_dest->success) {
                    echo json_encode(['status' => 500, 'msg' => $conn_dest->msg]);
                }

                $dbsrc = $conn_src->conn;
                $kini = date('Y-m-d');
                $besok = date('Y-m-d', strtotime("+1 days"));
                $from = isset($_GET['from']) ? $_GET['from'] : $kini;
                $to = isset($_GET['to']) ? $_GET['to'] : $besok;
                $sql = "select bc.*,
                t_pl threshold_packetloss,
                case when bc.verifier_code = 'PNK' then t_lat_mnd else t_lat_btm end threshold_latency,
                t_jitt threshold_jitter
         from (
                 select bc.id_region_tsel,rg.region_tsel,
                             date_format(date, '%Y-%m-%d') date,
                             verifier_code,
                             count(*) total_sites,
                             avg(packetloss)               avg_pl,
                             avg(latency / 1000)           avg_lat,
                             avg(jitter / 100)             avg_jitt
                      from ci_bk.brix_cti bc join master.region rg on bc.id_region_tsel=rg.id_region_tsel                          
                           where date >= '$from' and date < '$to' group by 1, 2, 3, 4
         ) bc join (select id_region_tsel,
                                      avg(threshold_packetloss)     t_pl,
                                      avg(threshold_jitter)         t_jitt,
                                      avg(threshold_latency_batam)  t_lat_btm,
                                      avg(threshold_latency_manado) t_lat_mnd
                               from master.brix_target_cti_unique 
                               group by 1) t on bc.id_region_tsel = t.id_region_tsel and year(bc.date)=t.year order by date,id_region_tsel";
                $q = $dbsrc->query($sql);
                $total = 0;
                while ($b = $q->fetch_object()) {
                    $qq = "insert into qosmo2.mart_brix_cti_daily (periode, id_region_tsel, region_tsel, verifier_code, total_sites, avg_pl, avg_lat, avg_jitt, threshold_latency, threshold_jitter, threshold_packetloss) ";
                    $qq .= "values('%s',%s,'%s','%s',%s,%s,%s,%s,%s,%s,%s) on duplicate key update total_sites=%s, avg_pl=%s,avg_lat=%s, avg_jitt=%s, threshold_latency=%s, threshold_jitter=%s, threshold_packetloss=%s ";
                    $sql = sprintf($qq, $b->date, $b->id_region_tsel, $b->region_tsel, $b->verifier_code, $b->total_sites, $b->avg_pl, $b->avg_lat, $b->avg_jitt, $b->threshold_latency, $b->threshold_jitter, $b->threshold_packetloss, $b->total_sites, $b->avg_pl, $b->avg_lat, $b->avg_jitt, $b->threshold_latency, $b->threshold_jitter, $b->threshold_packetloss);
                    $dbdest->query($sql);
                    $total++;
                }
                $q->free_result();
                $dbsrc->close();
                $dbdest->close();

                echo json_encode(['status' => 200, 'data' => $total]);
            }
            break;

        default:
            echo json_encode(['status' => 400, 'msg' => 'unknown cmd ' . $_GET['cmd']]);
            break;
    }
} else {
    echo json_encode(['status' => 400, 'msg' => 'Bad Request']);
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

function curl_post($url, array $post = array(), array $options = array(), &$err = null, $countRetry = 0)
{

    $defaults = array(
        CURLOPT_POST => 1,
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_TIMEOUT => 3600,
        CURLOPT_POSTFIELDS => http_build_query($post)
    );
    if (strpos("https://", $url) === 0) {
        $defaults[CURLOPT_SSL_VERIFYHOST] = 0;
        $defaults[CURLOPT_SSL_VERIFYPEER] = 0;
    }
    $ch = curl_init();
    curl_setopt_array($ch, ($options + $defaults));
    $err = "";

    if (!$result = curl_exec($ch)) {
        $info = curl_getinfo($ch);
        if (intval($info['http_code']) != 200) {
            $err .= "error:" . @curl_error($ch) . " -- " . $info['http_code'];
        }
    }
    $info = curl_getinfo($ch);
    curl_close($ch);
    if ($err != "" && intval($info['http_code']) != 200 && $countRetry < 5) {
        $countRetry++;
        sleep(2);
        $result = curl_post($url, $post, $options, $err, $countRetry);
    }
    return $result;
}
