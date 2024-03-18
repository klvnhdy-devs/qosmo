const m = {

icon: {
c1:'filter:invert(90%) sepia(1%) saturate(30%) hue-rotate(75deg) brightness(93%) contrast(86%);width:31px;',
c2:'filter:invert(73%) sepia(88%) saturate(2601%) hue-rotate(130deg) brightness(94%) contrast(84%);width:31px;',
calendar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACHklEQVRoQ+1ZTSsFURi+txApHwuyUSTs5GMhNhbY2KBkZyM7/8GGrbVSFmwlFrJiQ91SCmVnQ8lKsZDPBc9bM7dpmjkf78yZmVNn6u2e230/nud9zplz7ky5ZPlVthx/yRHIW0GngK0KdAL4IazFI/CHz13YhiKhLfhNwfwZ8IzxDOxdMb7qxp1Cs8hwFCp2g+9DigBeA+T9kEEMbhXjExOY8xQI1qPiBELleoNTc8iRyFMTtC6uAo5AVgo0odAqbBzWENC2DeOBkNa0AC8V9Z+AX03Il2KDi5jGZ7Bt2HdcXtEUakfQBaxPEZQptwoST8M+ogqICOwhYMkUKs286/Bf0yUQdavTrJua+zUyDesSoM2pKNcDgHTbTOAR4LtsJsBSgG5howWYQzSV92HLugoUALscAvcoIc+ckYeIQC8w9GeEQ1SGphAdFJ90p1CR9oHYo7pIgSLtA9bfRh2BvNeyU8ApkLADbgqJGviDH3+ZHa5DXK1CrDEF6D/zZAICjd4xoUdCwhiBHRReUeigyOXUa4LIxxGI6471CtyB2SLskzmNWhF3AuvIaw0wcWuHGVsD2kiYAY4As3GphTkFUmslMxFLATrjqJxTmJi0wu7hHfmYX/Sn/gpBI1plzDkfIPVCVHoRAXrteQzL++HXFzCMwSJfAMrAzSNwExb5aNtcw6uZaaenV1zncbVkBPw42urrMwAcLEHvyF5kNf8BXD51Mc+COjkAAAAASUVORK5CYII=",
down: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABL0lEQVRoQ+2WwQnCUBBEkxq0BBEEBW1BK7AIC7AT7xZhB1qCgoIHSxBr0Pl3ibt/dpHABPaU/fPnzeSQtun50/bcfyOAfzeoBtQAmYA+ITJA+rgaoCMkBdQAGSB9XA3QEZICaoAMkD6uBugISQE1QAZIH/c0sMZte8yAvrVb4IXXG8zBco8H4AHBkUU0YKfcNbboeADOEJxbRAN2LtBYWHQ8AFMInjBDizCx88TZJeZm0fAAFL0Z5pgIUcyvMFeL+bLjBciEcJuvBciAqDLPAERCVJtnASIgKPMRAAwEbT4KoAYixHwkgAcizHw0gAUi1HwGQBdEuPksgG8QKeYzAYr2BLPDvDFbzN36e+DZq/mV8Oin7wogPeIfF6gBNUAmoE+IDJA+rgboCEmB3jfwAWlVLjHI5tR5AAAAAElFTkSuQmCC",
filter: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABhklEQVRoQ+2YQWoCUQyGnS4UStFV8Rg9QHuBUu0ZLIh4ADe9QBfitqta9A66cNFlL9CjWLpx5x+YASkzY/KSp30lAwFxkp//y8vMPF7WSPzKEvffcIBzr6CvgK+AsgM+QsoGqst9BdQtVAr4CigbqC7/tyswRGsmiJa6RXKBHUpmiDmntGoFtihucwQi5XxDt8PRrgJYobjHEYiUs4Zun6NdBXCF4g3iliNinPMJvXvED0e37iE+B4TIPAEeewudEkJsngNAOaeACDLPBYgNEWxeAhALQmVeCmANoTYfAmAFYWI+FEALYWZeAxAKYWpeCyCFMDdvAVBAkLmbmk//F+7dcbcHnC1EkXPsS8zVWiBxUJO8xL0nrpgkzwHybvkKSMbmMNdHyEcodHbyOh8hHyEfIWUHfISUDbR6Cz3Dx0vKm7kmzL8i6FC47Przu9HC9CN+0Kny9S+KZADIdxfxjng4gHjD75Fy3EvLrZ6BMvEx/pwiaLzopPsjNQDye4m4QLBOmkMA9weGUDE0Zvm9AAAAAElFTkSuQmCC",
home: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEGUlEQVRoQ+2ZeagNURzH37Nlz/ZkCVlSRChZsryUvyT7LrwQIlFC1mzZIltIIUvIs0vxl6SUKCVRlCxly76/EL6f60xN05y5M9e9d3o1v/o2M+d3lt/vnN82M4UF5ZwKy7n8BYkCcZ9gcgLJCfznDiQmlGYD64tfWXgZYqObq08tT79Xen4TNDZXJ9BZi+4WepjFH+g6T7hgEaan2q8JXnk+qq2RUGZTIhcKjNFi+4VqnkX/6HmVsFLg3k3D9XDSImQDtb/NhwJsxmphSRpzQdBJwjdXv9gVqClhjgiD0gjvsG+Zvs9MQ6wKtJQQ54UOIYV3ur3QzRDhhhCbAsXGdrFTP3qqxq9COwsf55ws/DDz+HXLmQ/M0GrbBcKkH5WqscQIt0nXuQEnRATqZeFnXYFKWmirMMuyIBFmubDGw2enCa1VAhTJ+QnUM0fdzyLEF7VPEM66+EQnJ2yyy6eFhhGUyNoJtNeiOGtry+KP1U4UumP4LXTFjOoIo4Tbpp2Me04g2YWhrCgwUCsdFbyp3hHgqm6IJE7a72tOqsh0wJFLTBtN1YWDwogQGvy3Agu0yDqhgmWxPWqfLfw0/Om67hC8zo0ZkehWCNxjWsvMc1BFwCZY66GggVU1cK8w3iL4L7UTWXYaPs69TZiZZlfPiD9RwF+gYcIhoYZl3CW1jxU++PFtCjRWZxyxm2XSd2ofKVw2fKrOE4LNub3T4CeDhUeG0UlX/AK/8SOKQfzrvpfpp0BXM1kTy2T3zGQPDZ8MjHOTkaMQZsEmXDGDMBUiVG/LJFSmnMRFN9+rwDgx9wmYjx9RDtPns2FSChwWqIUyIcxwjrDLDMZvuJ9qmey32hcKJMYUOQrgoCSeRQFSbBBvscAk0FKB8jgbJbk3EBAUtggVLfKwadOEMmfxA3qgxPUj6hV2hGoTIgTSn+PPJhGKCauvzaT9dSWP1LUsQv9iRwHsuZVPx+dqw0xuGh5JCOfukk3JXXM90T3O7SS9NrrHv/yKQaJYkaMAKZ6I4q5TKHOHCigBZVIGZKInSQ9rOGUG19b1mDDAM9loPZe67XeKGoj7EOaC2TjvotwT76MWYpkowBjv6yc+ul6YbyZcq2vqzc/rgCQhdoA07xCdg5w7UyHDjDuuTrxjO0Qu6ChQGaSCSZgIQvzlGOMiKuD3tsXDKICz2NJ8PpTKuBZyhIuqwHcNJPX7Edk66mnmXQGKMwo2PyL88kUiCuVdAb6yXbdIyFc2vkZEoUSBqD6QnIDHvhITSkzIZRKxRKFPEsD2OcUvHGbbiXnf5h3cl8KUErw49IkQuLurL6W4H/FFjt9GYYmPw7YX/dQcYRRopn68PjYNsSrC8c3U9kuI9TYLbUPMxV+ZjcLdoL5hFAixVnxdEgXi2/t/K/8FWS3YOYVA47MAAAAASUVORK5CYII=",
layer: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACSklEQVRoQ+2YjU0DMQyF2wlgAzoCTEA3gA24DWADygawQdkANigTwAjHBrAB/ipHOpncnS+X659iyapaJc57dmzHnc+OXOZHjn9WCOw7giUCpxyBcyF3I7oQrUXfRX9yE57iCgH4XrQShUQQwK9FX5RQFi45CQD8UYH3gYPIUw4iOQgsFTifQ2WjRPhMkjEE7tTbKcAtWAgQldehLFIIAHwlypXJLbXadhPxEiAZScwH0WZi5iYQ7JHwz6IkfGfl6iOAl2MVZSrg1m5v5WojAHBvRdkVGXLkX+WKEbiUhZ+7QpVwzpXs+Qr7YgRIULx/qEIUwLiVk4wAxMgBWFIyD0UorWCqm4A8VYjSWYme7YHJr5xJOV1b4F1XKIaT2g8RdBdEAnDAj+oDMTJEg1BeTBCRb7WNx13Sd4W6jEAEvXad1L3oQ6+JG7j3Ci1kYejE1F5CymDSlKV6LYUIwInmxthkEOK60pMg1TpDpHTiWg+1Dy7IAsZTuaIVRfdiA1tWIJK1E0MkeKeZaBweq1wkJuuJInuDhIdi1QLcEsneicPLEa9aYLcKit/fRC1RojX0hTtpJ46G2biQCI15KPZGgPM4ZCXquc82xHzH2yhJivexR5ITETRFSicundhxb0ontk4i+Uonjlyd0omDU3LMxKUTO6pTc0npxAMdNmp5mYlj7qv0oVdm4oZ3JpuJPRd4qRHJORN7zt2uGfOvROzZsZIfPTNEWyd2A+9qZIONmA28n4bMxKPOyxkBC4RhvWsmHgV8yghkAeY18gddusAxhfMn1AAAAABJRU5ErkJggg==",
list: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACLklEQVRoQ+2ZzysFURTH30NCEiVCsrGRhYWUJbKxt5Kd2FCsZIeVZEPZ+LWSrGxZiWSDjSzeH/DKj5Rig0R8T915zVyZOTN3xpuZzq3T9Lqfc5wf9849c2UzCR/ZhPufkQCKXUGpgFTAMAOpXEI9SEqDR2JuMX+tMfX43Q0pM0zqX+qPmLjSJ/UKrAKYZjqwCG5Bse3KeC1TNyi2BsUZu7IewCsmK5nW78E1K3YWz2Wmngn2BuUqtwC+fVh/Blun+HlbNXyYCIQ6kq5XQAIIlFN/SlIBK1+yB/ytnALtuoTogLJejV72cwA6FTSB54aXQgjzd7DR4vYaHcLkOoRzEpPTZ8pYBZ67kEFIlCfxFOwfuQUQQpL+10TqmjlqI0YhjR55pL2yB/mwcbFo5g7hEO0DztgHNKLA2DRzn3ColOM9mCcIZZ1GIpu5Fzhutc+JbOYkAOZS1bHQmjmpQBQV+ILREqZh+1soNpv4GM4PMAM4ADes2Ng0czVwaIx5Eu+Ao0sAGtLMMav+C0tdM9ePEOlyi/M9MAnuQqWkHE/6oIn6e4AutU7sZdArkMdkK7OcN+C6FEv7ZpupZ4KRf21uAci9kEl6mbqhtRJyrcLMuI5JBayMxHIJ0f07tQWc8QCoSYFzeC5xlAyZd+g7/n+hnwObAMaZf2QFHH0L0+iAXEKqmbpBsS0oUuNYGHoA9LsPwjmJzzUv6MqvFxLlzdwp7DvOqtT1QkFLWzS9xFfgB46vejFVRQwlAAAAAElFTkSuQmCC",
right: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAE4ElEQVRoQ+2aecgVVRjG3dLSRG0XgxBMQUWwlDATUSslRXMlNXPBMBQRlcQF9HOF7B+RUojKPfdwQQ0sBQ0KXEpK0SK3SkUL9xLXnt9l7uXc5cycMzP3I8EXHrzfzPu+5zxz5rzLGatWuc+l6n0+/yoPCAQr+LD+bSO8KLwgPCM0EOoK14WLwnnhR+GAsE+4msbqJ1kBbF8XBgm9g8m6zumGFLcJXwhbhNuuhoV6cQhg86ZQIbSKO7Bh95t+zxZWCnd8/fkSeF4DLBVe9h3IQf9n6QwVDjro5lR8CIyR1Xyhts8Anrq8SnOCFbnrYutCoLocfSS85+IwJZ0v5edt4d8of1EEHpKDDULPKEdluP+dfHYTroT5jiKwTMbvlGFyri53SvENwRqlwghUyHCG60gFeiz9ZGGP8KowT2A148hnMhppM7QRaB8MXi3GiLeCp/a1YUvYXZeAxADZri81l1IEiDKHhCYxJo/JIoGIVSh9dGGtUCOG379k00Igm+dJKQIV0oj76uB8kvChZZL9dX21QGTzlU9l8G4UgfpSOCnU8/Vu6JOI2gk3LT7e0nWyri8JNnJT4YTpt3AFpuvmzASTz5p+pR+8MrY4Plj3lgu+e6xoFQoJHJfTxikQwMVeoYdgi+OE5yWeJKhgnzYfjEngJd34PqXJZ93s1w+S0d8Wv8N1nTAZlY9Mc/YRyTUjpiGxekrKBHB3WHhNOGvxTYz/xIPEKulSZhQRIOuRdMohlMxdhFMW56N0fbEjiV+k16wUAZb5sXLMPvD5R/CAjlnGGK3rHzuMf086RMlMR5d9hR7Xb5JFmNB0EMMjK8QQJ9cixhmr+wsdSNC2/mASIOv+GmK4VfcqqyKdqrHmRpDgddxlEqAhp9G2ySzdSJKdHR5qToXccE54MsSor+7RM+Reof8TAeZFxOJkwyb9dGOjSYBel91tE5Qxqgxx2QdEy29MAk/ojwshs2PnTxTWCEk2MfXRPyHj0NR/LkSVGJw/ZZp/M5Fx+EQxVy7hAXUVMtGjhPjURxyaXSokwK7uVKbZ/ym/LPtRi/+Bur5CcKlQSYq5XsVcAY5M3i8DAQpEJp9XBhvj0G1xQucyecxoiijJM2IS6KC/6WHTlCNyRh10xuKUcMi+8unSeNUgXEQAMqeFZ1NiwCbjnbdl+Dh9MgHkKYGMXkSAC2lVpN/KF73AZcvDIKtTEvueVNDJDTF9FtbhZD/e1ToJVoHXpq1gC5fddY8sWtNzDI4aaezzAkGpRiLpZuY86APL5GhuNgm1PCePOu8973+elCJAqUoT0ijGIJgsEMaXsOVbwmaBjyG+QlvaUvjdhQA6PKkdvqME+ny86CxwtpkVqkcq2kdi+qRro/UskrBelCc5LuaANBscbhGWCaPU+HEnH1qHhRGgHmGz9YpJIg0zDhlYTWv9FXUawDHjdqFjGrPx9PFTMPnQTjGKAGMSMTiEIuVXluzWQHw4tOWR3DxcCKCMHh3ZNMEn7fsSpmzncHiCYDuazPPpSiBrROfGR4/mvjNz0KeMGSFkGhVX8SWAX9L/sGA1nnMdKESPI3OSJ0/eu1mKQyA7F4iwL/jQTaj0qWsoCwixHNNw0sbX/FiShIA5IAdirwi0eq2FhgLd3aMCNRHdk/lfDSj2OHlILGkRSDyRuA7+A11O0DEYsEOIAAAAAElFTkSuQmCC",
search: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAD/klEQVRoQ+2ZWaiNURiGzzFHpgxF5CjkgsxDuJA5RZQMuXBCpKQQcUOUMUXJjcRBRGS4MaaOQmYyRCQhU+Z5Hp5Xe2db1tr/Wvvfp7NP7a/e2v/6v/V+613fGv9dWFDBrbCCt78gL6C8M5jPQD4DMXsgm0OoDm2pByqBV+BNzLZ5VY8joDkRRoMhoBNoYER8zfMlcATsBHe9WhTolImAtsRYAMYketsn5C+c9oBF4KpPBV+fEAFVIJ2XaHxV3wCG3w+eVySEfM2Q459qvgI0vneDgdkICscJMAK8iMvnI6A2QUpB57jBjPo3eO4DXsbhjRKgFeUgGBQR5D3vL4OHQOO9CegI6kbUUyb6gW+ZiogSMDcxZl38Z3ixHBwA5pjWnBkMNG/U0y5bzIuFZSGgCNKboLqFXJNRK8oS8DMiuDppFlgGbJP/O+XtE7GCdaTLwAbYJlkYNURGgv2B0frjfwgoM6ZpnxgbyPfH3SVAY/epo/fjpHwOnCstDVUWm4HHoSJcAooh2mQhu0ZZBxA1bNK14zQve1gcZlK2JlsCSiCaYCGb6BAWEncUzrssFfZRpqEZZK4MXIFFE8s0nXdirdvUrwHeAnNC36esRVDrcXYJeMa7hgbZPZ6LQgM4/G0dpL2gWii/S4DIzNXiAmVdQwM4/I9Rrg3MtFoUfAyJ4RKgnVVkqaYJbBtWIfGSvtqBexsVtTBoWAUtEC4BDyDSspZq73jQ8qp9IK7pyNHUIHnOc6NQYpeAoxANsJB1oexiaBDDvxXPty0c5yjrHsrtErAUovkWsrWUzQgNYvi7uFfhp40uyFwCtNFowzHtEwU6Zd4KivLXWcukbmQ6opumq+nhUN50ZyE1srWFUJNZAoNWC/y1RGrydrNw3qGsDQiawOJJJ0A7cYmjR9RT44C+PviYenwzcO2003m3zofI9EknoDLOmlj64mAzbWwSeTwicE/ebwG2bKqqvlwooxldaqIuNO0gPg9sd4Jku0/yQ2ebs+ARSN7ItOnp3NM3jUANmaGgFHzJdgaSfDqnbwdRYjOJn6yj+TQFbAsl8W3UVIg1RjWsysqUjWKwNSSArwBxDgOaiPVDAlh8dZr9APRlz7RgESECFEzbvzKhbzqZ2F4qTQMbgca+zYJEhApIBtSRYjYYDsxDn9koTU59FFsNdKKVqa52Xpd5i8hUQDJwTX70Avro1RLo67RWIR3MnoBTQDv6Z6OlirseTI4rIq6ANPEjX2VFRHkKkEJfEePx3WHrkvIW4CtCV9zGuSrAR8R1nHQq+M9yIQPJRrmGk3pf92edgnNagC0Tarw+STr/1cmlDKRmQkcX/ZWlG6DuCk7LRQGR62+qQ15AUHeVgfNvkCWrMdeLotIAAAAASUVORK5CYII=",
signout: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACwklEQVRoQ+2YOWhVQRSGExFioWhUtIqgdhIQt6BV7CIuhWBQTBswilZuYGwUxCBauTZ2LoigjakDaSzUyoVokVILTcAFBAXxO+G+EMZZz+Q9GbgDP8mde87M/83cO3fetLcVXtoL999WA/zvGaxnoJ6BzBGoH6HMAcxOj52BpfS0Bi339DjNvdcRjpYRsw69Qb8i4r0hIYD9ZJ9EO9CCiM56iHnhidvIvTHUWcH28fdTRLvOEBfAEjLuo32Jje8lftSTc4t7R+fc/8D/O3MgbAAd1SjJqKeWEMA9GhwwGs2CsAFcp4Pjqc6reA2ApKohTID1NDaBFioAfpOzCb315NpmoBGugjABztHaJYuBV9QNVyP1x2HwO/WyEvmKD0A1EyaAvIC7DQcfud6AvipmxUwJASRDmAAvaWGL0etdrgfnwbw0EQOQBGECyIeo2zB7levTLQaIhsgFWEVPothymUBZqWJL8MXOATiPi4so9DWPNeuK80JoAeRj9wNpllsNkBNCC7ASF581TjJyrBAlAVhf7NIABOI9kl3vN7koEUB8n0A3SgY4jPmHpQI8wXg/mtmTlfYIPcXzQSQ735miBVhB7peMJVGT+o/5HAD5fTyF5Ad6K4rVfA6A5O5BV9DqBILFxMpXPKU4zecCpJhoxMZupxvxXvOxANcIPKVxa8lJAQiatwE8p3K70fEjrg+1GCDKvA3gMZUHDLM/ud6K3s0DRMwMRJu3ARyh8o7FqOw75FBKdoSuH/WyKj0LQIYAkszbAOTIbxJpl8decsc9ED6AZPM2AKk7hm4qHxftwZbKvAtA6m+jIQWEBkBt3gcg986gC2hRAkgIYIS2zs5pL8t8CEDudyE5Td6F1gbeDTmV21a9Qy5mOcGQlW4zeoDkDHZ2Y5YwULOhzT5R0HhKyqkBkoarCcH1DDRhUJOaLH4G/gJOga4x6zJELgAAAABJRU5ErkJggg==",
sort: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACqklEQVRoQ+1YS0hWQRT2kY+FLsJEfGxatLNWRm3EjVJgubCl5K5NRFBEtLCNkG1KUBA37iOCdtHGJIgQxEDwAUarHhCp2BMVyfo++Yvb9Z/mnPln7q8wAwfunfnO4ztnHvdOackBb6UHPP6SSKDYFYwViBUoMAOaKVQPX2uQHYHPKmBaBDgNhH7fQn4mlaQEbkHpLuQppBey+R/PFRhbhhzVRCfEPgOuU0vgNhQGE0qTeO6BbBicNqP/vTAgLew7FGo1BBg4CaTbc3Scg/zIM7ZvCHDKcOqY2gsMdEO+pQANeP+oTa0Q/xm4w5IK3AfousDoNDBnIV9T2FG8twv0NRAu4geQezYCIwBcVVieAfYMhNnJvKV3oWFEcM0hile5jJsWtoNJmUqSQBlUtiCHZKp7UF3o4Q6VaUtX4CK8n4eQzJ/G98pUVFN4X0/0vcYzd6t/DpksmEgOslUEUpcK5iTeZy0B8jSW2M9nhonYliRA4kBLgNV7CTktCcCA+YX+IciAzUYIAk1w+sHmWDA+D8wJGy4EAX7EvbM5FowvAtNqw4Ug4OtTYgHBHy8GAW7DS5BjNueW8XGMX7bZCFEB+uS221jALsQdSLSOQhGwJc7beCTgLZWOhmIFDInjCdohXMT8v+afHz/L1S1EBXh78UkZyWPgLyh1duEhCLicxE8QC/+x1S0SyJOyGvStQKoV6ZwA9pIC/xcaogI03gY5JZyiXMSPIF/2EwGXWJx0QlXAKRgXpUjAJWs+dUJVwLSIeYP3EMLrGy8tBAHbNsrPjDteohduc9pbCdtJPAa/VyKBXAYkU4i/drwqSTZed/DaI187gk6exKbGm+8bWVagD876IeUQXjjNQW7mnk1xmD6nuYip+yZLAr58BbEjmUJBHPsyGgn4yqSrnd8bxo8xPmrC0QAAAABJRU5ErkJggg==",
upload: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACiUlEQVRoQ+1Yv0scQRj1YgiBgD9Ip42BgI1gFwQVSZGgIghqrViImKCIhf9CUAkhTQwpUygoIoKIaBMEwQRELWxU8EcbU6iQKBr1vbALy7CX/eZm5m7v2IGH6+yb73vvm7nZ2U0V5XlL5bn+osRArmfQ5Qw8hLlxoAF4B8y7MOvKAMVPA12e6L/42w1M2TbhwoAq3tfsxIRtA+nEOzNh00CUeCcmbBmQirduwoYBXfFWTZgayFS8NRMmBkzFWzGRqQFb4o1NZGLAtngjE7oGXInP2ISugY/INGT7OKDE4xO7CViX5NE1sIagjZLAhpw3GD8piaFr4CWCfgHK0wR/gv7HgsTn4FyH8O7QtwN0AmeCONZfaD4jab8gMQvxTcCLpOjOQFTAxEBUhdT7yQwoFUmWULKEdCuQLCHDiiW7UKEtoQ8wNCxYFXXgfBfwIim2l1ANMi4Dlf/JvIR77cBNpDoBQTVQgTF8GPF75iPBeFLmgB6Fy1NpWHEo+jLALcX1LlAmzPUbPBZgELjgGDXJCvpeCYP5NB6BmwGO1W08mvfpDvKKPBBm4Eqj8sG8f/APX0K+ArcCQU/BmQB6Bdwwyh46q8MMsJom7QCDfwA/0wQpRv8zgG91JQaJjjG2yoUBA01aQxMDWuUSkLfBOQHagAcBPnetRYC744tAf6xmYAPC6gH++EeA9wGh3J65MbBxu+7wrmNl4BNEvfWE8cfNTzd+407DHYdtFBiLo4FfENUCHHrV5rXfZnHB/Z5LaAHgDsYWqxkI6BVfHvlm1CfxPm48F4fJHXEVqV8zvWqgFX0zAM8ycW2nEMajy2aYAfbxMV8LSA9z2TTKI8sWwE+T/5rt43Q2zRSGgXubmYkxBXJ2KAAAAABJRU5ErkJggg==",
},

login1: () => {
	const a = el({a:'div', b:document.body, d:{style:'position:fixed; top:0; left:0; width:100vw; height:100vh; display:flex; align-items:center; justify-content:center; background-image:linear-gradient(to right, rgba(190,30,60,1), rgba(150,29,51,1));'}})
	
	el({a:'div', b:a, d:{style:'position:fixed; top:0; left:0; width:100vw; height:100vh; background: url(telkom_night.png);background-repeat:no-repeat;background-size:100% 100%;'}})//  background-image:linear-gradient(to right, rgba(190,30,60,1), rgba(150,29,51,1));'}})
	
	const b = el({a:'div', b:a, d:{style:'background:rgba(255,255,255,0.9); box-shadow:0 0 5px 3px rgba(150,29,51,0.5), 0 0 7px 5px rgba(255,255,255,0.3); border-radius:11px; display:flex; flex-direction:column; align-items:center; padding:0; margin:-10vh 0 0 -5vw; z-index:1;'}})
	
	el({a:'div', b:b, c:'QOSMO', d:{style:'background:rgba(255,255,255,0.9); border-radius:50%; box-shadow:0 0 5px 3px rgba(150,29,51,0.5), 0 0 7px 5px rgba(255,255,255,0.3); padding:15px; width:95px; height:95px; margin-top:-49px; display:flex; align-items:center; justify-content:center; font-weight:bold; color:rgba(100,100,100,0.5); text-shadow: 0 0 5px rgba(200,50,20,0.7);'}})
	
	const c = el({a:'div', b:b, d:{style:'display: flex; flex-direction: column; gap: 5px; padding:3px 57px 29px 57px;'}})
	
	const d = el({a:'div', b:c, d:{style:'position: relative; padding-top: 20px;'}})
	
	el({a:'img', b:d, d:{style:'position: absolute; left:7px; top: 31px; width: 14px; height: 14px;', src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACCElEQVRIS7WVyytEcRTH3XlR8ioLjCZ/gKSGrFhI2ZhpxkJWhIUFKzZKoSQbjwVqViysmOZxZyYWsrBmFlY2iCYkS0Lm5XMXauI+fnMnt273d+85v+/nnN85pyuV/fMliei73W67y+WawHcwn887JUl6yeVyxw6HYycYDL7paRgCPB5Pvc1mO0Kk87cQsGur1dofCoVutSCGAJ/Pd0LEfTpRXhFAO5l8qfnoArxebw8Rngkc43gkEtkrGkD0i0S/ZATgqPaj0eiIGcA6gBkjAHaZDHxFA/x+/xSbtgUAmwBUAzGqQRM1uAFQoQfJZrOdsVjsougMlA3UYZpj2tICcP4bnP+sqTZVZgBxq8ViGUBgjXVtgdAH6xXuABmUk8GjcAa0ZxWiAQSHiVCZ1CkmV6bfe3g6+fbCFJ+l0+kOfHaxO7mVeRkNh8NPhSDVGlDcME7+QkdE73g/ReSZdR3Pbt5bf/kk7XZ7F0OX/fn+B0D0HRT2XKBzVF3IcFiW5QNNANGvYpwzC2BfkJYd0gOcYuwtAXAPoEUPoHRDYwmAskwmUxmPx98VjT81oO/fKGBlKQDatoG2fdYCfAIoLwVA+zYnEokHVQBFvsTQZhZAC78y2TXsz2sBxjAow2PqArAMYEGzyIqBLOZxnOSoqkUp+H/ie5hKpWaTyWRaFyAqKuJn+E8WEdHz+QZ+4MQZun8CHQAAAABJRU5ErkJggg=='}})
	el({a:'input', b:d, d:{type:'text', placeholder:' ', class:'LoginInput'}})
	el({a:'span', b:d, c:'Username'})
	
	const e = el({a:'div', b:c, d:{style:'position: relative; padding-top: 20px;'}})
	
	el({a:'img', b:e, d:{style:'position: absolute; left:7px; top: 31px; width: 14px; height: 14px;', src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACu0lEQVRIS7WVS2gTURSGO5mEGIsYQYsu3AhqqxXciQiaIkYJ5IWEakEFwZULFR+g1T58FKmKotu6EFHESJ5W0IVk4aOuRaWuBMWFSKnSajFD4nfD3OE6zZAx1oHL3Dn3nv8759zHaC3/+dGc9CORyFKfz7dP07Qu5iyn/aD/ivf1bDb73m1c9QBaMpk8hUAvLVBHaAbbLiB5N5A/AIlEIojTHSKNSOdqtTrJ9xu+V9LahB3bdKVSWVUoFD43gliAVCqll8vlx4htVcRL9JO5XG4yFArNCwaDNxnvMcdPk8UF14B4PD7s8XiOqw6GYXQWi0URfe2JxWILmDMBxMvnAwApVwAcV+u6LoR01YFSLBLRqzbW5wvfS2gZADtdAaj9NaI6ZNb3BcL9RDrt9XrH0+n0hBQhyw3Yx8x5V4AfcwUgqndMbKd9QrQD0SnpGI1G24EHEF7Lexj7MhOwHcATVwAymMHZT+S3cdqrOjG2m7G7ttK9ZV4ntqpbwBQirQBKOIqDZT0AjjJ22QboYl6pkbgYr21TSvSM1ybRZ38fyOfzI6JPzdch/pS22AYYADCo2tDow9fAd0i11wAIdVPje3KATMYR/c73eprPIdJ+dtFZM0BR1lvmvIvYT0of66BRiquIHq4nBvAj9iOMH+RtlRB7H5mcE/eW3+9/ztgKswqXyOSEVSIpSpo76O+ndeBs8BaXWpFL7z476xc7aj677KENcgbIeXy3YVd31RCZ9Drepg5laXGA3CC7bnzaCOyrXDP6PX8NEGAB4eSPIhSyLz7XywhZloSddd3cFMAJQsSDlGuAi3OhmENZvzUNkBCifUR/i8xEQmbtIqeaN7Kba2KHWOfknzKQ8HA43MozqmbC+mzMZDJjcwIQIBvkJ6Vaw3p8mDOAgLC4Af6KexB/yUF7PeugNap3M+O/ATImLoDpOXN0AAAAAElFTkSuQmCC'}})
	el({a:'input', b:e, d:{type:'password', placeholder:' ', class:'LoginInput'}})
	el({a:'span', b:e, c:'Password'})
	el({a:'img', b:e, d:{style:'position: absolute; right:7px; top: 31px; width: 14px; height: 14px;', src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADWklEQVRIS82VX0jTURTH/elmGpL5lJr2UEp/QCNHf9SHJkQ2UedkolAEVkhQpA/Wg0baQ/RWRD5EWfRU2WT/xCYktKLSIlKKHqxekswicFBi29yfPtfuT9ZwuiKhweWec+4533Pu95zfnZKwzD9lmfET/u8ENTU1B7Ra7T2LxTIVi4l4b6BUV1dnhcPhDEVRArOzs5MA65OSkhwATwWDQbPT6XywUJKYCQwGw6qUlJR6QM2A7iQ4PRIAexi7iA+GQqFtDofjdVwJdDqdNjc3txXnk8RnqEHgzSCPYlvPnhkBds1mszXFRZHJZNqM4x1WIYCfAMsWgchdPp+vXaPRrIaWDuyHpP071edDzxd5Yzt0taC/UhPOUwTHZQTbOEhmNQNaCNBx5O5AINDMWS+6IYqmNrvdfl7YiC/FZxAxQFITlAn515gajcYSgu8jiooMVDDChLzDlkdDc6j8KPLpKBo+eDyeTW6321tbW5tltVon2XdRmIOVDs5ecB6J6cgm8yhGDWu32izo+iHYgd80kg2RYEdkAgAa8O0RNs57uYlZFrsF3+fIfvC2KgC5UPbBnZGMThWEoAnRA5zG2ddFUTMEYIkE13PeQyFrVB8YqU9MTBS9HBAJZgDxMNd5fDCi6rkf9ttsDVG0iIaHCS6BkmFBMX4vML0nYb3qW1dXl0bf3gqqhMMlDk6gXMfpiOok+XyCnhhV/S389ssiDhJ3k1UMXc8iirMgm7FfVhivFXxQTzEUYegk+GyE4xnkeR3ZS2Ub+/r6xqkyVVSJ7QL0XIygthPKOsAahfbSuSkSjebaD8XUoF5kOk4xHQHJ8QD2cglwDrC5aaJHTeLZQL8hdBImk/AKYiPgY+DtgcaP899BZWXlWsbRRVABDkNMyTH6Ms3+hiAt6zPn+fRpWgDq9XqNWgRNLQDwKmYxpiN8lOUul+ur8PvtLaqqqloJSJesQrw1E8g5svrDarWy4lS/318GcCO6SfQe/26v19sK+DeVsgUfOxpfjINIVCQcBZ/0RocYktXeRd4gbyZchrlpS2SjF00gOR6Wr6hIUEYCt7Q7sW9HHmM9RoZq60sVMHqP+VxTaRvB7axBqDHGAljKvugfTkVFRSYJfP39/Z6lgP74Bn8LGDdF/yrBTzNUuzQBSWfcAAAAAElFTkSuQmCC'}, e:{click:a=>{
		a.target.parentElement.children[1].type = a.target.parentElement.children[1].type.toLowerCase() == 'password' ? 'text' : 'password'
		a.target.src = a.target.parentElement.children[1].type.toLowerCase() == 'password' ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADWklEQVRIS82VX0jTURTH/elmGpL5lJr2UEp/QCNHf9SHJkQ2UedkolAEVkhQpA/Wg0baQ/RWRD5EWfRU2WT/xCYktKLSIlKKHqxekswicFBi29yfPtfuT9ZwuiKhweWec+4533Pu95zfnZKwzD9lmfET/u8ENTU1B7Ra7T2LxTIVi4l4b6BUV1dnhcPhDEVRArOzs5MA65OSkhwATwWDQbPT6XywUJKYCQwGw6qUlJR6QM2A7iQ4PRIAexi7iA+GQqFtDofjdVwJdDqdNjc3txXnk8RnqEHgzSCPYlvPnhkBds1mszXFRZHJZNqM4x1WIYCfAMsWgchdPp+vXaPRrIaWDuyHpP071edDzxd5Yzt0taC/UhPOUwTHZQTbOEhmNQNaCNBx5O5AINDMWS+6IYqmNrvdfl7YiC/FZxAxQFITlAn515gajcYSgu8jiooMVDDChLzDlkdDc6j8KPLpKBo+eDyeTW6321tbW5tltVon2XdRmIOVDs5ecB6J6cgm8yhGDWu32izo+iHYgd80kg2RYEdkAgAa8O0RNs57uYlZFrsF3+fIfvC2KgC5UPbBnZGMThWEoAnRA5zG2ddFUTMEYIkE13PeQyFrVB8YqU9MTBS9HBAJZgDxMNd5fDCi6rkf9ttsDVG0iIaHCS6BkmFBMX4vML0nYb3qW1dXl0bf3gqqhMMlDk6gXMfpiOok+XyCnhhV/S389ssiDhJ3k1UMXc8iirMgm7FfVhivFXxQTzEUYegk+GyE4xnkeR3ZS2Ub+/r6xqkyVVSJ7QL0XIygthPKOsAahfbSuSkSjebaD8XUoF5kOk4xHQHJ8QD2cglwDrC5aaJHTeLZQL8hdBImk/AKYiPgY+DtgcaP899BZWXlWsbRRVABDkNMyTH6Ms3+hiAt6zPn+fRpWgDq9XqNWgRNLQDwKmYxpiN8lOUul+ur8PvtLaqqqloJSJesQrw1E8g5svrDarWy4lS/318GcCO6SfQe/26v19sK+DeVsgUfOxpfjINIVCQcBZ/0RocYktXeRd4gbyZchrlpS2SjF00gOR6Wr6hIUEYCt7Q7sW9HHmM9RoZq60sVMHqP+VxTaRvB7axBqDHGAljKvugfTkVFRSYJfP39/Z6lgP74Bn8LGDdF/yrBTzNUuzQBSWfcAAAAAElFTkSuQmCC' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAC+klEQVRIS+WVXUiTYRTHfffRhnSxWVT0gYGRJRRERLAilhXhcpsfrYvwJiIoSoi6KCOQCAUvQkgLoroI6sbZ5jY2iKgkUm+iJMpMCuqmD0znTTn22e+MvfK6NvXGKweH8zzn/M//PM8553mnlCzyT1lk/pIllMDhcKwxGo1l6XRaSaVSE5FI5OdCylu0RE6ns1Sv1zdCckxRFBu6LI9wMpPJDGLrIeHjUCj0t1DC/xLY7XaD1WptBnwZWaUGQSYEw0gFCVdryfD9wtYRjUa7+vv7k1rfrARut7sK4ENkB0ET6BUCZt1Naa6YTKZMIpFoxy4H0P4m5Ybg3iJNgUBgRHXOJKivrz+Es5dgM84W1htYn2d9LxaLnTObzfexHcdWqKyd4L4j7Yjc1OP3+59KkizY5XLto95PIPhDvBPnUF1d3SjrSk68nuaeBHatWFOJ+9TX17eFCth0Ol0IXCl9ORwMBl8qtbW16yB4h1EPYbXP53sjRNxoWqpDsuUkG8S3u1gC7NPgSsXf0NCwi3I+A8/ZEtsVgsNsHPgaAflUEuy/cz34hq18DnJxjRM7MxAczoOth5tFJIGUhQGIbmICYpoEQSnXPMSqO0gCt7qpqakx0bMvJLAqZOvGcRa5A+i0CqKeB6lntlEL+B0g9rnmcLc53Bn2txR5UAaD4TWbrchVgG0a4M0CI5mfr5OYC5qYFmJkmkaTyeTO7BRRpo2oARxrudYNmn7J6/WmsEkJW7G3sF6Wxxxn3wb5dXTG4/HoaWoH2Ivsf8BjY7K+zsw0RBU4IgA24xxizE7x/D8IKZNRjs2DyC0zyEfK18vEyQCUUM5txN2VSQMzxhQdYUQ/i2/WoyGJBVsXwCZ0GrAX/WBqauqFdgAkkE+K2WKx7Ad7gq18s3TIo3g83hwOh6PqbQt+7Gh8NQB5WHtzwAR6jITjuZe8knUla0PO/wrdqm30nAlUp1ydUhyFbA9kVejsF5W1fElH0ANsvRC/V2Py9RL6RytWgvnsi16if+tuTCly7ullAAAAAElFTkSuQmCC'
	}}})
	
	el({a:'button', b:c, c:'Login', d:{style:'background:rgba(255,0,0,0.7); border-radius:3px; border:none; border-bottom:1px solid #505050; color:rgba(255,255,255,0.9); padding:7px; text-align:center; margin-top:9px'}, e:{click:a=>{
		/*
		fetch('api.php', { method: 'POST', body: JSON.stringify({cmd: 'login', user:b[0], password:b[1]}) }).then(a=>a.json()).then(b => {
			document.getElementById('loginLoading') && document.body.removeChild(document.getElementById('loginLoading'))
			if (b.data && b.data.count && b.data.count > 0) {
				//console.log(b.data[0].cn[0])
				document.body.removeChild(a.target.parentElement.parentElement.parentElement)
			}
		}).catch(a => { console.log(a) })
		*/
		m.user = document.querySelector('.LoginInput').value.trim()
		document.body.removeChild(a.target.parentElement.parentElement.parentElement)
		localStorage.setItem('login', true)
	}}})
	
},

home: () => {
	el({a:'div', b:document.body, d:{id:'ct1'}})
	
	const a = el({a:'div', b:document.body, d:{id:'menu1'}})
	
	const b = el({a:'div', b:a })
	el({a:'img', b:b, d:{src:'img/a1.svg'} })
	el({a:'img', b:b, d:{src:'img/a2.svg'} })
	el({a:'img', b:b, d:{src:'img/a3.svg'} })
	el({a:'img', b:b, d:{src:'img/a4.svg'} })
	
	el({a:'div', b:a, c:'Qosmo Dasboard' })
	el({a:'img', b:a, d:{src:'img/a5.svg'}, e:{click:m.login1} })
},

showPage: a => {
	document.body.children[0].innerHTML = ''
	document.body.children[0].appendChild(a)
},

selectPage: a => {
	
	if (a) { a = {a:a} }
	else { a = window.location.search.substring(1).split('&').reduce((a,b) => (a.a ? a : decodeURIComponent(b.split('=')[0]) != 'a' ? a : {a: decodeURIComponent(b.split('=')[1]) || '' } ), {}) }
	
	if (a.a) {
		
		switch (a.a.toUpperCase()) {
			case 'PERFORMANCE':
				m.showPage(m.page2)
				m.judul.textContent = 'PERFORMANCE'
				//window.location.search = '?a=performance'
			break;
			
			case 'POWER':
				m.showPage(m.page3)
				m.judul.textContent = 'POWER DAN SUHU'
				//window.location.search = '?a=power'
			break;
			
			case 'ORDER':
				m.showPage(m.page4)
				m.judul.textContent = 'ORDER'
			break;
			
			case 'UPDATE':
				m.showPage(m.page5)
				m.judul.textContent = 'UPDATE'
			break;
			
			default:
				m.showPage(m.page1)
				m.judul.textContent = 'SUMMARY'
			break;
			
		}
		
	} else { m.showPage(m.page1); m.judul.textContent = 'SUMMARY' }
	//console.log(window.location.search.substring(1).split('&').map(a => ([decodeURIComponent(a.split('=')[0] || '_'), decodeURIComponent(a.split('=')[1] || '')] ).filter(a=>a[0]==='a').map(a=>a[1]) ))
	//console.log(window.location.search.substring(1).split('&').map(a => ({query[decodeURIComponent(a.split('=')[0])]: decodeURIComponent(a.split('=')[1] || '')})))
	
},

init: () => {
	Chart.register(ChartDataLabels)
	//Chart.register(ChartDataLabels, TreemapController, TreemapElement)
	
	m.home()
	//if (!localStorage.getItem('login'))
	//m.login1()
	//m.page2 = page2(document.body.children[0])
	m.page1 = page1(document.body.children[0])
	
	//m.judul = document.getElementById('topBar').children[1]
	//m.selectPage()
}

}

addEventListener('load', m.init)