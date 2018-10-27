

function createContract(){
    //return web3.qkc.contract([{"constant":true,"inputs":[],"name":"Count_seller","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_count","type":"uint256"}],"name":"Buy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_patient","type":"address"},{"name":"_seller","type":"address"},{"name":"_count","type":"uint256"}],"name":"AddPatient","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"Sell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"Count_patient","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name_type","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
    return web3.qkc.contract(abi);
}

function deployContract(contract, _name) {
    return contract.new(
        _name,
        {
            //data: '608060405234801561001057600080fd5b5060405161030d38038061030d83398101604052805160008054600160a060020a0319163317905501805161004c906003906020840190610053565b50506100ee565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061009457805160ff19168380011785556100c1565b828001600101855582156100c1579182015b828111156100c15782518255916020019190600101906100a6565b506100cd9291506100d1565b5090565b6100eb91905b808211156100cd57600081556001016100d7565b90565b610210806100fd6000396000f30060806040526004361061006c5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633d00830f81146100715780633e3282181461009857806394b662f1146100b2578063aea90cb8146100e9578063c8f8af9c146100fe575b600080fd5b34801561007d57600080fd5b50610086610113565b60408051918252519081900360200190f35b3480156100a457600080fd5b506100b0600435610119565b005b3480156100be57600080fd5b506100b073ffffffffffffffffffffffffffffffffffffffff6004358116906024351660443561015a565b3480156100f557600080fd5b506100b06101b3565b34801561010a57600080fd5b506100866101de565b60055490565b60015473ffffffffffffffffffffffffffffffffffffffff16331461013d57600080fd5b60045481111561014c57600080fd5b600480548290039055600555565b6000805473ffffffffffffffffffffffffffffffffffffffff1990811633179091556002805473ffffffffffffffffffffffffffffffffffffffff94851690831617905560018054949093169316929092179055600455565b60025473ffffffffffffffffffffffffffffffffffffffff1633146101d757600080fd5b6000600555565b600454905600a165627a7a723058202622c6db1c80bbad325959fe5b373d4441cb7b37f4c5bf34aba91e91fd50a0000029',
            data: byteCode,
            gas: '1000000'
        }, function (e, contract){
            console.log(e, contract);
            /*if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                totalDescription =  document.getElementById('description_of_Quest').value;
                console.log('post')
                let urlJSON = 'http://192.168.43.227:3000/contract';
                let params = '{' +
                    '"id": "'+id+'",' +
                    '"address": "https://rinkeby.etherscan.io/address/'+contract.address+'",' +
                    '"price": "'+contractPrice+'",' +
                    '"lat": "'+firstlat+'",' +
                    '"long": "' + firstlng+ '",' +
                    '"description": "' +totalDescription+'"' +
                    '}';
                console.log(params)
                fetch(urlJSON,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                        body: params
                    })
                    .then((res1) => {
                        console.log('res1.token', res1);
                        res1.text().then((res2) => {
                            resolve(res2);
                            console.log('res2.token', res2);
                            id = id +5;
                        });
                    });
            }*/
        }
    )
}

function createRecipe(_name){
    console.log(_name);
    let contractInstance = contractFace.new(_name,{data: byteCode, gas: 1000000}, function(err, contract) {
        if(!err) {
            if(!contract.address) {
                console.log(contract.transactionId);
            } else {
                console.log(contract.address);
            }
        }
    });

    let contractAddress = contractInstance.address;
    let doc = document.getElementsByClassName('content');
    let newRecipe = document.createElement('div');
    newRecipe.className = 'recipe';
    newRecipe.id = 'fourth';
    let newRecipeLable = document.createElement('lable');
    newRecipeLable.className = 'drag';
    let b = document.createElement('b');
    b.innerText = '{ '+selectedDrag+' }';
    newRecipeLable.appendChild(b);
    newRecipe.appendChild(newRecipeLable);
    doc[0].appendChild(newRecipe);
}

/*function addName(_name) {
    var Multiply7 = web3.qkc.contract(abi);
    var myMultiply7 = Multiply7.at('0xff8d447957b14cc18e9e6bf485a257f99f83eb2e321ed70af692db63d7b1e2eb6903b3ae');
    myMultiply7.Sell(function(error, result){
        console.log(result);
    });/!*
    myMultiply7.methods.AddName(_name).call({from: '0x6985B24eBe039aB7d28db3ac04C400aEf73EccbF'}, function(error, result){
    console.log(result);
    });*!/
}*/

function appoint(){
    let patientWallet = document.getElementsByClassName('input1')[0].value;
    let clinicWallet = document.getElementsByClassName('input1')[0].value;
    let amount = document.getElementsByClassName('input3')[0].value;
    let index = existDrags.indexOf(selectedRecipe);
    let address = existContracts[index];
    let contractInstance = contractFace.at(address);
    contractInstance.methods.AddPatient(patientWallet,clinicWallet,amount).call({from: '0x6985B24eBe039aB7d28db3ac04C400aEf73EccbF'}, function(error, result){
        console.log(result);
    });
}
