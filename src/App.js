import LocationList from "./LocationList"
import runEngine from "./Engine"
import * as fxs from "./GPTFunctions"
import Map from "./Map"
import Header from "./header"
import Selector from "./Selector";
import { useEffect, useState } from 'react';
import LoadingScreen from "./loadingScreen";
const lat = 40.741895;
const lon = -73.989308;

const testPins = [
    {name: 'DIG', id: 1, lat: 40.74074650000001, lon: -73.9883108},
    
{name: "Ruby's Cafe - Murray Hill", id: 1, lat: 40.7436223, lon: -73.97988810000001},
    
{name: 'Refinery Rooftop', id: 1, lat: 40.7522605, lon: -73.985361}

];

const testLocs = [
    {
        "html_attributions": [],
        "result": {
            "editorial_summary": {
                "language": "en",
                "overview": "Modern, petite counter-order spot for coffee, breakfast bites & sandwiches, plus beer & wine."
            },
            "formatted_phone_number": "(212) 683-7800",
            "geometry": {
                "location": {
                    "lat": 40.7453125,
                    "lng": -73.9846013
                },
                "viewport": {
                    "northeast": {
                        "lat": 40.7466848302915,
                        "lng": -73.98330036970849
                    },
                    "southwest": {
                        "lat": 40.7439868697085,
                        "lng": -73.9859983302915
                    }
                }
            },
            "name": "Slate Cafe NoMad",
            "photos": [
                {
                    "height": 3500,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/111234086045904090293\">Slate Cafe NoMad</a>"
                    ],
                    "photo_reference": "AUacShi1YgYp9pwcBo6ojYKQVzJqXj__VoVX_7xeYj28khjO6I3IXK02RhNtIGJOmFqDaa7DAGwMlYR8FaMeWdnKHKDZGJXgRK_FlsTow_0ieDV56uhd_LiBpRIs-_U-6YUnBh1xeR7arsG1ps0NeMNwh2_7laPiGSclEXn28p1Pw_tpU_io",
                    "width": 2334
                },
                {
                    "height": 2303,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/111234086045904090293\">Slate Cafe NoMad</a>"
                    ],
                    "photo_reference": "AUacShgxI6vvkVTWPE6Dvl0SBgZD1p346be5KtY3JZ6hmbz6T2KcM-HfE5b7klkrY2it6QxjbhvcAXou5mo9JgxrID2hihCzP7mkkGTI_H9eTQtUDXVOhhXQf-4jlNP-u8cdv2J04JjveBCotqMpWwPjkyn_QRVTn1To6wW8gA_PjrmBveDY",
                    "width": 4095
                },
                {
                    "height": 3024,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/109865316659775026421\">Kadir Ozkan</a>"
                    ],
                    "photo_reference": "AUacShh0sRp82Cq3p2YZsszq6KhPE3oKrRikSwF_l8cqrC3jO602VSrErh9N_7nWDoSuBMeTmZUSGokg4HdtsF-HvKiW7pyDE6Pq5xwwfg77R5mWK6n6cZe-gxmn_3zw3WH-5qwssEVWuo70jBQ_aBOVG5gsFLROiLDAhUS3JRAAtY6Bm1BW",
                    "width": 4032
                },
                {
                    "height": 4000,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/104282294279987097467\">Natalie Ionkin</a>"
                    ],
                    "photo_reference": "AUacShhqJvWGnIVRomcNU9-p2ONEmikKjgGXmmfbK9jgQVf40gVmw7P9djdU41Fl_kAHDqZ4qxWxGfVysFo53MgGz7D1xjsFxXsdlRT-xLY-_iY1NqSlFSHdaCmGwfKwy2q9zPyW_26NPzxTyDdUcGU7_quR-HHbnNzPRQYQmyrqycnzt4hr",
                    "width": 3000
                },
                {
                    "height": 3024,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/101720553180737354833\">The Foodie Architect</a>"
                    ],
                    "photo_reference": "AUacShilXAt0XbRuVT7UVB9EAGa3pRiJ4cTRbWcwIQT8Oe3UcBl0zlYcylcfiFayDe-ce6UxhQ36HF_1pyPUNem_2GGiNgjVvI0L5CQ544XK1YGVXY25YlcEqPz3c7abHRT9lptxcetcOfq_0dzQoxhAa3XMlNNqtqo7fPZA05pfTLsPw8DG",
                    "width": 4032
                },
                {
                    "height": 4032,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/109912269774294262498\">Eugene</a>"
                    ],
                    "photo_reference": "AUacShgTES08k1bGWFDHBEc96ZmkFi-_86h5vxVDQrr87-cppsmyYguTBeNpoNWqw2Fs1s1ZpHvpGEd30Zce_8M6m0H7sxAqFVGCI7Aoy3cUD-K3r0_3EwnwnUTjAe3Od_jlyfjSaFMn_qJwVTOja6jZqsB0Kt8LnYhAxJ0HqsAACzGM_F7f",
                    "width": 3024
                },
                {
                    "height": 3000,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/100647361569491182151\">hannssy</a>"
                    ],
                    "photo_reference": "AUacShgH2VUO_6rkAjyztV3AAysM8Q8GuUc7R_eZvf5U89xLYAWwc4QLhEqLkrYklnZtHM8EqKjaKKVp-QOFC5R2lxP41LuxxCtaq37BNw7vOECUAOb12Qy1GvIDu_1uTVju8-8RIM4x9KWQbfrfmJLIdznGHI3IHt5adYP7GeLZZMJU6w4C",
                    "width": 4000
                },
                {
                    "height": 3024,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/102411855152064265748\">Jörg Peschka</a>"
                    ],
                    "photo_reference": "AUacShj_UUR9Aucwmbg1duOth6XT0VCUAQ2HTfRaDH7pb3WKYUMbwyYX5K2forNN5TohcafMDaPPR-fWoqaVV8hYVn6pk9rFsl59Naiz1J50XlRcPnRhnqGaQacuKAVpJKHoZY_vB-f6kOoybzQmi3zMq3fWaP3m4Pj7iN9zSJ-idbBGgkNs",
                    "width": 4032
                },
                {
                    "height": 3024,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/111937520011155531874\">Michel</a>"
                    ],
                    "photo_reference": "AUacShh5YbOtbJWwM9FpNsULT-HQZmuwpa-ExTEdRFQ14r97pg3nUbNrCHCcxG6t6gKYzwsjJfZxbyf9nn2vrveDwDzXDQJeCBZ7WMJ4NNkZ5zT5cwJZjFRrKRax1wE3RHEKeixUJQJYaeSB8to-LTeJRrZDminDsOVgXeW6ACu7arnGHGgW",
                    "width": 3024
                },
                {
                    "height": 4032,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/109912269774294262498\">Eugene</a>"
                    ],
                    "photo_reference": "AUacShg1MYWrrxnSncXnORiwHwRWZMoPMaQxXDlZZuTSpJEwsMvIvpg7sC3f15mBnXimO_tINzlLqG_oMLcrx5AOqLPb1raTfWXgTGO8Mzb_vtOSuG1mckKTnCcFFNuChMaLV5eyKTiq3asoaQyAh5EV8HLozBHyGuSlvtqsEntrzULx5z80",
                    "width": 3024
                }
            ],
            "rating": 4.5
        },
        "status": "OK"
    },
    {
        "html_attributions": [],
        "result": {
            "formatted_phone_number": "(877) 347-4673",
            "geometry": {
                "location": {
                    "lat": 40.74648920000001,
                    "lng": -73.982579
                },
                "viewport": {
                    "northeast": {
                        "lat": 40.7476951802915,
                        "lng": -73.98095866970849
                    },
                    "southwest": {
                        "lat": 40.7449972197085,
                        "lng": -73.98365663029149
                    }
                }
            },
            "name": "Gregorys Coffee",
            "photos": [
                {
                    "height": 4032,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/111923048461302255544\">Marina D.</a>"
                    ],
                    "photo_reference": "AUacShhxh2CWKHLltAUNvefVpZBH8KBqCOP4rsdNYqNpAvM6For0dwRCG9m17k-JI3I0DZCRo3eQcMS3QQ-EJ4bFmA6hKOciVO7GOyIFH0j2L2r52eJqY1d5mG8Yj7zNa9D-dt10wZmyUkf-E1LqAjh7FkqJKGC2gfVig_LiSFpArQ6J90iF",
                    "width": 3024
                },
                {
                    "height": 12000,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/110845357605628679158\">Caitlin Santiago</a>"
                    ],
                    "photo_reference": "AUacShhS5YyJh-QC13aevP_iepn5WDoIyuMNOgkSOPCYV4fe5AwOWED8_ZIsDXMvBJ9IPC2cLOc39AkXK0Qu6iKIlPqrqmH3cG2Qx4mtuRDb2jYcvFAi3y76q6EMSvNm6mG7tYKWz6Qy_WwwOgbgIUTmEHUu8AhHKvWL0yZuKRRrLKOlbnYc",
                    "width": 9000
                },
                {
                    "height": 3000,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/102524931560918283122\">Daniel Kim</a>"
                    ],
                    "photo_reference": "AUacShgHqM5SFY2t2W9LRbaXxA8LsDG13v6b7mdc44rE12iNYDdPQHhQQsU8HZnR9QwV53O9MFslZVgwD792gNWwZjI8wSinqWI_xSbUmAm0j0YSQ3isnxKgPDiYg8ULu6BymXORPk4aKQKdjlegY2sti6B_vJhCNo_LnFwsUtFhFGFN_Lbc",
                    "width": 4000
                },
                {
                    "height": 4032,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/115355874466978261194\">Marcelo E. Lopez A.</a>"
                    ],
                    "photo_reference": "AUacShjXkaG4V6YV2RhXXcNQdtx5oX9itfftHoSZpC6mTIA8InYXcpoUcGvwQTB01Ej2MPYtLYlBrFjjAfBVHxfdtUg5WJi24lbLexXPGcjwnTzIfxI6-TMDpkSsXEcdsTlC1wYgJpRlm6uctvXXT5qrjAh4-s0rtt_VE1-wI7ynsrXbZlxi",
                    "width": 3024
                },
                {
                    "height": 4000,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/103953798914619685448\">Cris J</a>"
                    ],
                    "photo_reference": "AUacShhKMbqZ0UbNGdwQMxQ0Y1hAN2x7CgNJnJp2Z5QIWR7Sa3xSnFJEOGGBVn1d18ymCyMaJLXTT7oFyyL9i1VQc9KHVf4NFZtXTPDXNfYUPvvr4wcdbRRGwxn4eCbxeyn8EP4T8hvBxsSApG9DVXvsRMxU8A5wobQBc5ADUDK93eQLt6OX",
                    "width": 3000
                },
                {
                    "height": 2992,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/104556133035649836911\">Andrea Sangalli</a>"
                    ],
                    "photo_reference": "AUacShjA3OEEVIpnBwh8xCfEkqAKeZnqh8wTAM9qPTepa450UeDD7W3X8tgpcmnJP2s2IYNKVbB2OTlBiDOrIT1GaPXs0Y-mJf4oQfT24WYPpqFVc0LswoaXjAev2NTA3B5drEdWw5EMAo-qkbB8iXFpkBbZu1VYVBLG9hV5Y4LgAELMtxfx",
                    "width": 2992
                },
                {
                    "height": 3024,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/113877928857529598840\">Bethany Ferrell</a>"
                    ],
                    "photo_reference": "AUacShgtI9PKkZF1DFPeyuWGnuUgN8xmsff0eRdLajOlAsEcoVG52T1NlspOoUjArJabRTLqDbk2JrC8I5VabirFFxyQPklrwzlv75y6WWqt7JRiVtqglO85WPBkSzfLB6m2TplKS7sXfKtSxPU02ZqfgvvI1AFPbYINOo4xJiiABEKBBMqL",
                    "width": 4032
                },
                {
                    "height": 2988,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/114947372847756221910\">Jason Kahn</a>"
                    ],
                    "photo_reference": "AUacShj7AJV4xsmClMm47bEp00QBYZONMxoqhxlevbA6pwpA8NryHB_BimKoOTiB8fqvjd2HYGeiE8yjTjA867u7k3NG0M5Np6lVQ1U4I05K5mSSA-XAcZPJhbQTV-rINdkSU9D_r-P7g-pF4sz9SIQukJuTPg88KpnhlrtFH1PrGMqcuSaN",
                    "width": 5312
                },
                {
                    "height": 5312,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/104341968868995288775\">tom kidron</a>"
                    ],
                    "photo_reference": "AUacShhHvFGmT3A5QXe3kgTZbYtD8NQ6xcgCJsnYwFJ7GPfpsSEL5RE2o37V-gTj8S3so_RsBFzTgWXPHCZ1fkobcq96bKFplqfuEEMKjIYDoFyq_JEpwaSCeTmcqbNH4bcKD5HvX303BbKI6v7an0t28WjF7Sz_3pr0yJWdEuOjL9ApKssU",
                    "width": 2988
                },
                {
                    "height": 4032,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/100833057048924672882\">DAILY ARSLAN</a>"
                    ],
                    "photo_reference": "AUacShirXcxLM6a8IjXIEfhSSRAeSvl-Hf1KbbYyVnABqQa5mgQunzGNEAHNop5aRBzgnPIxVuNhHHRIK1NBXkgIKS234OJ3cwy15lFRsI1KJRqmUPwmpstOPG_qdzs0M80woVx7ZNNLa1KgWHWLEuR0eS9JGviEPb0pe5v65M0CI7KovqC8",
                    "width": 3024
                }
            ],
            "rating": 4.2
        },
        "status": "OK"
    },
    {
        "html_attributions": [],
        "result": {
            "editorial_summary": {
                "language": "en",
                "overview": "Chef Tom Colicchio's refined, farm-fresh American fare served in an elegantly understated space."
            },
            "formatted_phone_number": "(212) 780-0880",
            "geometry": {
                "location": {
                    "lat": 40.7381658,
                    "lng": -73.9886678
                },
                "viewport": {
                    "northeast": {
                        "lat": 40.7394435302915,
                        "lng": -73.98740291970849
                    },
                    "southwest": {
                        "lat": 40.7367455697085,
                        "lng": -73.9901008802915
                    }
                }
            },
            "name": "Craft",
            "photos": [
                {
                    "height": 793,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/104287569257193324163\">Craft</a>"
                    ],
                    "photo_reference": "AUacShjAZ_xFNrSPao8X5Vx92WEoyI9n5Ka0BXw2Lb2z5vr77dBDGLbbRROBjgqXt-E9pw0o6mXzmqKFQ3lUTk8CGwu-aN5wT7ONDlTx50M3--_56UltPWiG77Og89H69vrh6FL_q7HenhFJROjDs9BJ_nDFDT6NKCmluf3Z1irHlR0WSlBz",
                    "width": 1202
                },
                {
                    "height": 1667,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/104287569257193324163\">Craft</a>"
                    ],
                    "photo_reference": "AUacShjuHZgoymMtuf1H46foJG6EDz-d21btaQ8mA8yHB9FNnAG-YzteYvDUOcW1Sg3ZYLPPZQtOu6nGpw4EAJ4_YK70kRfZFJgzoQK39Rq3rwD6N3YwaLTYaj56_fUW3CAjHJuim9sQ4NgHcT-tHAcgp2x-JMLnk-XKy6q_XRaAaSCX4RQs",
                    "width": 2347
                },
                {
                    "height": 3000,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/102007817174968533583\">Jose Portillo</a>"
                    ],
                    "photo_reference": "AUacShjJ_S7ZQFmnjh48x0ittxfcm75dOKeIfPfAYAdXkVHf2OCNdJTwoDPqqTIUdpdiOFfpSaLAOouQrEE5a3XR9Ghg1PL6_4ZVKodXpilcqzYoj_-gSC5Hh4OJT2qCdcQEQShrmxzCRg_WPR2HxtN6rU9g5dNKOksMsn0cZg6jYqwCNmQq",
                    "width": 4500
                },
                {
                    "height": 503,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/104287569257193324163\">Craft</a>"
                    ],
                    "photo_reference": "AUacShhzai_-6UcLgYaAGDQkDl7JltE1175-Qkkc6pGop55fP6pFgVQ_pXCor-5SrSLhXBlOkuMc7y45KzwY6d_Ld98ZW_ZKP725Uishw0ru_67SEWnuZWMKw-GMoJXQ8rHalkt4GCvGigBQfPCPRBwpyd3Iqs1e1luTe-_EGDUfG4bL4qUm",
                    "width": 969
                },
                {
                    "height": 9000,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/111743401409948809708\">Chris Flanigan</a>"
                    ],
                    "photo_reference": "AUacShjiG3jQ4skvWW9JhisNR3o55frClKEbPm20BqBFLuh7X3Cqq95WJ4odvVh4IUXTV3zewgzE36zWNNhowUihMrZS-Q9pZ6PAown7QNTFYjQuaOpdCBCfZ2mF5L9oMKNvJURsDQ3clxfwMbeWbPNiqw_nK9EWVBSOmQRQ73xWDcanL0c",
                    "width": 12000
                },
                {
                    "height": 2448,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/102833195615520936916\">Linton Thompson</a>"
                    ],
                    "photo_reference": "AUacShgLFZU2UCrtqYi3GW9_3p8YCtQqbeqsSdf0gG82D39uh6N_SqLBGbdPH3OadjkAGi8z05Yv-YY5FAt4tnp0hOgkbfNYNWEnzQmw4CMseStKCrwsu3C5S0hPAcSNfEonFqAarRlxIzpvFF8WHThOSIxwRqmEg2Ur9b6GBoilu6TQk_wV",
                    "width": 3264
                },
                {
                    "height": 3024,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/116631799024838657757\">Alfredo Ibba</a>"
                    ],
                    "photo_reference": "AUacShhU6t_caGnuRbzQdSV232scWRfauT72AgcRIJB-oiJ34kBfM5FVowdZw5t9TPMQgMxYG8C47lqTofC89Wh52BSunj0Ocbk661TfqxhmGnp3Vy2cG3-ShG0noXHTHZmFIdnjEz1I1aY0QQYy4Xjd2IzKsnZ3HF8ZztqQYMK94U_gkwdf",
                    "width": 3024
                },
                {
                    "height": 4032,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/104093978685345177090\">Joshua Young</a>"
                    ],
                    "photo_reference": "AUacShhT8oQwaCrLGtaZpD3BZuyGC2LP2YafV0jyvA_acwUf8UV1b_2IVwdQkzotRPsMsCR92A3GNfYouG_25k6xxr23ovnWA1ndKGAE70Nf974X0h3jjxPyBhkNpKC_hYegKGgwTYzWGasRMN9KXfHPL5ev1NpB0K07OD0O0i1Gq2QFP94q",
                    "width": 3024
                },
                {
                    "height": 3024,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/104589915339464873297\">Mark S Smith</a>"
                    ],
                    "photo_reference": "AUacShg4CKiRnxzLxsti7RruoOE_abwaUL5HBlqEI9YfpxwSNyd0tWINEOG5soQy05QLLgStjAbDWMeKhb4zIVTfokDDb_yutVBC9uWGH3CpAUfpQZl82R15i2yN24F73U7lUwLVcJEbMvtIX9UwVQREFxazusSTZgLmN1UP-ulA-h06X6uy",
                    "width": 3024
                },
                {
                    "height": 3024,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/104589915339464873297\">Mark S Smith</a>"
                    ],
                    "photo_reference": "AUacShgGvc5EwsTL1G9isbYM4RHt_TsXeD3y2C2C5hfok6sP78mfYMeyBHdkqZBeYkfgX5Tfs-UsqnsDfU-MspuMxXcVlT4ajRtl7cNg5TLle3YGBmpztaueK0epLwtFZS3nIlx20KxsW0wr6v1V964rQ8FEL6g00xCX0A95RJWaBMIKBQKw",
                    "width": 3024
                }
            ],
            "rating": 4.5
        },
        "status": "OK"
    }
]

let outputLocations = [];

let mapPins = [];




function App({ lat, lon }) {
    const [appState, setAppState] = useState("default");
    const [pins, setPins] = useState([]);
    const [displayedLocations, setDisplayedLocations] = useState([]);

    
    
    function addMarker(marker) {
        console.log("placegolde")
    }

    async function makeSelection(selection) {
        setAppState("loading")
        console.log(selection)
        const output = await runEngine(selection)
        // vv problem child
        displayLocations(output)
    }

    async function displayLocations(locations) {
        console.log("test")
        
        let locPins = [];
        
        console.log(locations)
        const locationArr = locations.split(",")
        for(let i=0;i<locationArr.length;i++) {
            locationArr[i] = locationArr[i].replace(" ","")
        }
        const data = await fxs.getPlaceFromId(locationArr)
        console.log(data)
        for(let place of data) {
            try {
            console.log(place.result.geometry.location)
            locPins.push({ name: place.result.name, id: 1, lat: place.result.geometry.location.lat, lon: place.result.geometry.location.lng })
            outputLocations.push(place)
            } catch(e) {
                console.log(e)
            }
        }
        setAppState("finished");
        setDisplayedLocations(outputLocations)
        mapPins = locPins;
        

        
    }
    useEffect(()=> setPins(mapPins), [mapPins]);

    //useEffect(() => setTimeout(() => mapPins = testPins, 1000),[])

    //mapPins = testPins

    if(appState === "default") {
    return(
        
        <div>
        <Header></Header>
        <Map pins={pins} lat={lat} lon={lon} height={"70vh"}/>
        <Selector makeSelection={makeSelection}/>
        </div>
        
    )
    } else if(appState === "loading") {
        return(
            <div>
            <Header></Header>
            <LoadingScreen/>
            
            </div>
        )
    } else if(appState === "finished") {
        return (
            <div>
            <Header></Header>
            <Map pins={pins} lat={lat} lon={lon} height={"40vh"}/>
            <LocationList locations={displayedLocations}/>
            </div>

        )

    }
}

export default App;