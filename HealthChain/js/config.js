
let selectedDrag;
let selectedRecipe;
let existDrags = ['{ Alendronate }','{ Venlafaxine }', '{ L-Carnitine }'];
let existContracts = ['0x69b7ecc1129ba06f376b8dc99010184722292f04', '0xaba43d2b0da057f492c05728b0abf1ae25586947', '0xcae7077c34fb9dea46a83a60def201aed004f52a'];
function chooseRecipe(obj){
    selectedRecipe = obj.getElementsByClassName('drag')[0].getElementsByTagName('b')[0].innerText;
}

let byteCode = '0x608060405234801561001057600080fd5b5060405161030d38038061030d83398101604052805160008054600160a060020a0319163317905501805161004c906003906020840190610053565b50506100ee565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061009457805160ff19168380011785556100c1565b828001600101855582156100c1579182015b828111156100c15782518255916020019190600101906100a6565b506100cd9291506100d1565b5090565b6100eb91905b808211156100cd57600081556001016100d7565b90565b610210806100fd6000396000f30060806040526004361061006c5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633d00830f81146100715780633e3282181461009857806394b662f1146100b2578063aea90cb8146100e9578063c8f8af9c146100fe575b600080fd5b34801561007d57600080fd5b50610086610113565b60408051918252519081900360200190f35b3480156100a457600080fd5b506100b0600435610119565b005b3480156100be57600080fd5b506100b073ffffffffffffffffffffffffffffffffffffffff6004358116906024351660443561015a565b3480156100f557600080fd5b506100b06101b3565b34801561010a57600080fd5b506100866101de565b60055490565b60015473ffffffffffffffffffffffffffffffffffffffff16331461013d57600080fd5b60045481111561014c57600080fd5b600480548290039055600555565b6000805473ffffffffffffffffffffffffffffffffffffffff1990811633179091556002805473ffffffffffffffffffffffffffffffffffffffff94851690831617905560018054949093169316929092179055600455565b60025473ffffffffffffffffffffffffffffffffffffffff1633146101d757600080fd5b6000600555565b600454905600a165627a7a72305820cbec6ef60dd02fa5d7d498dabcf792f7f297fbd21b8a531c1cc323d5069d9b8f0029';
let abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "Count_seller",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_count",
                "type": "uint256"
            }
        ],
        "name": "Buy",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_patient",
                "type": "address"
            },
            {
                "name": "_seller",
                "type": "address"
            },
            {
                "name": "_count",
                "type": "uint256"
            }
        ],
        "name": "AddPatient",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "Sell",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "Count_patient",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_name_type",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
]

let contractFace = web3.eth.contract(abi);


