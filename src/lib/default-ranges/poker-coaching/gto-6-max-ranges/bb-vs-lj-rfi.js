import types from 'lib/default-ranges/types'

export default {
    name: "Big Blind vs Lojack RFI",
    range: [
        {
            "id": "b35982e7-1a6c-4649-a845-126584b792d5",
            "color": "red",
            "name": "Raise",
            "selectedCombos": {
                "22": [],
                "33": [],
                "44": [],
                "55": [],
                "66": [],
                "77": [],
                "88": [],
                "99": [],
                "AA": [
                    "AcAd",
                    "AcAh",
                    "AcAs",
                    "AdAh",
                    "AdAs",
                    "AhAs"
                ],
                "AKs": [
                    "AcKc",
                    "AdKd",
                    "AhKh",
                    "AsKs"
                ],
                "AQs": [
                    "AcQc",
                    "AdQd",
                    "AhQh",
                    "AsQs"
                ],
                "AKo": [
                    "AcKd",
                    "AcKh",
                    "AcKs",
                    "AdKc",
                    "AdKh",
                    "AdKs",
                    "AhKc",
                    "AhKd",
                    "AhKs",
                    "AsKc",
                    "AsKd",
                    "AsKh"
                ],
                "KK": [
                    "KcKd",
                    "KcKh",
                    "KcKs",
                    "KdKh",
                    "KdKs",
                    "KhKs"
                ],
                "KQs": [
                    "KcQc",
                    "KdQd",
                    "KhQh",
                    "KsQs"
                ],
                "KJs": [
                    "KcJc",
                    "KdJd",
                    "KhJh",
                    "KsJs"
                ],
                "AQo": [],
                "QQ": [
                    "QcQd",
                    "QcQh",
                    "QcQs",
                    "QdQh",
                    "QdQs",
                    "QhQs"
                ],
                "QJs": [
                    "QcJc",
                    "QdJd",
                    "QhJh",
                    "QsJs"
                ],
                "JJ": [
                    "JcJd",
                    "JcJh",
                    "JcJs",
                    "JdJh",
                    "JdJs",
                    "JhJs"
                ],
                "K5s": [],
                "A5s": [
                    "Ac5c",
                    "Ad5d",
                    "Ah5h",
                    "As5s"
                ],
                "A4s": [
                    "Ac4c",
                    "Ad4d",
                    "Ah4h",
                    "As4s"
                ],
                "65s": [
                    "6c5c",
                    "6d5d",
                    "6h5h",
                    "6s5s"
                ],
                "54s": [
                    "5c4c",
                    "5d4d",
                    "5h4h",
                    "5s4s"
                ],
                "AJo": [],
                "ATo": [],
                "KJo": [],
                "QJo": [],
                "KQo": [],
                "AJs": [],
                "ATs": [],
                "A9s": [],
                "A8s": [],
                "A7s": [],
                "A2s": [],
                "A3s": [],
                "A6s": [],
                "KTs": [],
                "K9s": [],
                "K8s": [],
                "K7s": [],
                "K6s": [],
                "K4s": [],
                "K3s": [],
                "K2s": [],
                "QTs": [],
                "Q9s": [],
                "Q8s": [],
                "Q7s": [],
                "Q6s": [],
                "Q5s": [],
                "JTs": [
                    "JcTc",
                    "JdTd",
                    "JhTh",
                    "JsTs"
                ],
                "J9s": [],
                "J8s": [],
                "TT": [],
                "T9s": [],
                "T8s": [],
                "98s": [],
                "97s": [],
                "96s": [],
                "T7s": [],
                "87s": [],
                "86s": [],
                "85s": [],
                "76s": [],
                "75s": [],
                "74s": [],
                "64s": [],
                "63s": [],
                "53s": [],
                "43s": [],
                "JTo": [],
                "32s": []
            }
        },
        {
            "id": "b22e86e2-a9ba-4181-b112-cac3a29e2279",
            "color": "blue",
            "name": "Call",
            "selectedCombos": {
                "22": [
                    "2c2d",
                    "2c2h",
                    "2c2s",
                    "2d2h",
                    "2d2s",
                    "2h2s"
                ],
                "33": [
                    "3c3d",
                    "3c3h",
                    "3c3s",
                    "3d3h",
                    "3d3s",
                    "3h3s"
                ],
                "44": [
                    "4c4d",
                    "4c4h",
                    "4c4s",
                    "4d4h",
                    "4d4s",
                    "4h4s"
                ],
                "55": [
                    "5c5d",
                    "5c5h",
                    "5c5s",
                    "5d5h",
                    "5d5s",
                    "5h5s"
                ],
                "66": [
                    "6c6d",
                    "6c6h",
                    "6c6s",
                    "6d6h",
                    "6d6s",
                    "6h6s"
                ],
                "77": [
                    "7c7d",
                    "7c7h",
                    "7c7s",
                    "7d7h",
                    "7d7s",
                    "7h7s"
                ],
                "88": [
                    "8c8d",
                    "8c8h",
                    "8c8s",
                    "8d8h",
                    "8d8s",
                    "8h8s"
                ],
                "99": [
                    "9c9d",
                    "9c9h",
                    "9c9s",
                    "9d9h",
                    "9d9s",
                    "9h9s"
                ],
                "AA": [],
                "AKs": [],
                "AQs": [],
                "AKo": [],
                "KK": [],
                "KQs": [],
                "KJs": [],
                "AQo": [
                    "AcQd",
                    "AcQh",
                    "AcQs",
                    "AdQc",
                    "AdQh",
                    "AdQs",
                    "AhQc",
                    "AhQd",
                    "AhQs",
                    "AsQc",
                    "AsQd",
                    "AsQh"
                ],
                "QQ": [],
                "QJs": [],
                "JJ": [],
                "K5s": [
                    "Kc5c",
                    "Kd5d",
                    "Kh5h",
                    "Ks5s"
                ],
                "A5s": [],
                "A4s": [],
                "65s": [],
                "54s": [],
                "AJo": [
                    "AcJd",
                    "AcJh",
                    "AcJs",
                    "AdJc",
                    "AdJh",
                    "AdJs",
                    "AhJc",
                    "AhJd",
                    "AhJs",
                    "AsJc",
                    "AsJd",
                    "AsJh"
                ],
                "ATo": [
                    "AcTd",
                    "AcTh",
                    "AcTs",
                    "AdTc",
                    "AdTh",
                    "AdTs",
                    "AhTc",
                    "AhTd",
                    "AhTs",
                    "AsTc",
                    "AsTd",
                    "AsTh"
                ],
                "KJo": [
                    "KcJd",
                    "KcJh",
                    "KcJs",
                    "KdJc",
                    "KdJh",
                    "KdJs",
                    "KhJc",
                    "KhJd",
                    "KhJs",
                    "KsJc",
                    "KsJd",
                    "KsJh"
                ],
                "QJo": [
                    "QcJd",
                    "QcJh",
                    "QcJs",
                    "QdJc",
                    "QdJh",
                    "QdJs",
                    "QhJc",
                    "QhJd",
                    "QhJs",
                    "QsJc",
                    "QsJd",
                    "QsJh"
                ],
                "KQo": [
                    "KcQd",
                    "KcQh",
                    "KcQs",
                    "KdQc",
                    "KdQh",
                    "KdQs",
                    "KhQc",
                    "KhQd",
                    "KhQs",
                    "KsQc",
                    "KsQd",
                    "KsQh"
                ],
                "AJs": [
                    "AcJc",
                    "AdJd",
                    "AhJh",
                    "AsJs"
                ],
                "ATs": [
                    "AcTc",
                    "AdTd",
                    "AhTh",
                    "AsTs"
                ],
                "A9s": [
                    "Ac9c",
                    "Ad9d",
                    "Ah9h",
                    "As9s"
                ],
                "A8s": [
                    "Ac8c",
                    "Ad8d",
                    "Ah8h",
                    "As8s"
                ],
                "A7s": [
                    "Ac7c",
                    "Ad7d",
                    "Ah7h",
                    "As7s"
                ],
                "A2s": [
                    "Ac2c",
                    "Ad2d",
                    "Ah2h",
                    "As2s"
                ],
                "A3s": [
                    "Ac3c",
                    "Ad3d",
                    "Ah3h",
                    "As3s"
                ],
                "A6s": [
                    "Ac6c",
                    "Ad6d",
                    "Ah6h",
                    "As6s"
                ],
                "KTs": [
                    "KcTc",
                    "KdTd",
                    "KhTh",
                    "KsTs"
                ],
                "K9s": [
                    "Kc9c",
                    "Kd9d",
                    "Kh9h",
                    "Ks9s"
                ],
                "K8s": [
                    "Kc8c",
                    "Kd8d",
                    "Kh8h",
                    "Ks8s"
                ],
                "K7s": [
                    "Kc7c",
                    "Kd7d",
                    "Kh7h",
                    "Ks7s"
                ],
                "K6s": [
                    "Kc6c",
                    "Kd6d",
                    "Kh6h",
                    "Ks6s"
                ],
                "K4s": [
                    "Kc4c",
                    "Kd4d",
                    "Kh4h",
                    "Ks4s"
                ],
                "K3s": [
                    "Kc3c",
                    "Kd3d",
                    "Kh3h",
                    "Ks3s"
                ],
                "K2s": [
                    "Kc2c",
                    "Kd2d",
                    "Kh2h",
                    "Ks2s"
                ],
                "QTs": [
                    "QcTc",
                    "QdTd",
                    "QhTh",
                    "QsTs"
                ],
                "Q9s": [
                    "Qc9c",
                    "Qd9d",
                    "Qh9h",
                    "Qs9s"
                ],
                "Q8s": [
                    "Qc8c",
                    "Qd8d",
                    "Qh8h",
                    "Qs8s"
                ],
                "Q7s": [
                    "Qc7c",
                    "Qd7d",
                    "Qh7h",
                    "Qs7s"
                ],
                "Q6s": [
                    "Qc6c",
                    "Qd6d",
                    "Qh6h",
                    "Qs6s"
                ],
                "Q5s": [
                    "Qc5c",
                    "Qd5d",
                    "Qh5h",
                    "Qs5s"
                ],
                "JTs": [],
                "J9s": [
                    "Jc9c",
                    "Jd9d",
                    "Jh9h",
                    "Js9s"
                ],
                "J8s": [
                    "Jc8c",
                    "Jd8d",
                    "Jh8h",
                    "Js8s"
                ],
                "TT": [
                    "TcTd",
                    "TcTh",
                    "TcTs",
                    "TdTh",
                    "TdTs",
                    "ThTs"
                ],
                "T9s": [
                    "Tc9c",
                    "Td9d",
                    "Th9h",
                    "Ts9s"
                ],
                "T8s": [
                    "Tc8c",
                    "Td8d",
                    "Th8h",
                    "Ts8s"
                ],
                "98s": [
                    "9c8c",
                    "9d8d",
                    "9h8h",
                    "9s8s"
                ],
                "97s": [
                    "9c7c",
                    "9d7d",
                    "9h7h",
                    "9s7s"
                ],
                "96s": [
                    "9c6c",
                    "9d6d",
                    "9h6h",
                    "9s6s"
                ],
                "T7s": [
                    "Tc7c",
                    "Td7d",
                    "Th7h",
                    "Ts7s"
                ],
                "87s": [
                    "8c7c",
                    "8d7d",
                    "8h7h",
                    "8s7s"
                ],
                "86s": [
                    "8c6c",
                    "8d6d",
                    "8h6h",
                    "8s6s"
                ],
                "85s": [
                    "8c5c",
                    "8d5d",
                    "8h5h",
                    "8s5s"
                ],
                "76s": [
                    "7c6c",
                    "7d6d",
                    "7h6h",
                    "7s6s"
                ],
                "75s": [
                    "7c5c",
                    "7d5d",
                    "7h5h",
                    "7s5s"
                ],
                "74s": [
                    "7c4c",
                    "7d4d",
                    "7h4h",
                    "7s4s"
                ],
                "64s": [
                    "6c4c",
                    "6d4d",
                    "6h4h",
                    "6s4s"
                ],
                "63s": [
                    "6c3c",
                    "6d3d",
                    "6h3h",
                    "6s3s"
                ],
                "53s": [
                    "5c3c",
                    "5d3d",
                    "5h3h",
                    "5s3s"
                ],
                "43s": [
                    "4c3c",
                    "4d3d",
                    "4h3h",
                    "4s3s"
                ],
                "JTo": [
                    "JcTd",
                    "JcTh",
                    "JcTs",
                    "JdTc",
                    "JdTh",
                    "JdTs",
                    "JhTc",
                    "JhTd",
                    "JhTs",
                    "JsTc",
                    "JsTd",
                    "JsTh"
                ],
                "32s": [
                    "3c2c",
                    "3d2d",
                    "3h2h",
                    "3s2s"
                ]
            }
        }
    ],
    type: types.range
}