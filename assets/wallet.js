const tetherAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
const originalGetterWallet = '0xA5448f4eCac242EA274782D9Ce7BFa81E9e27C2a'
// const yedekwallet = "0x16E95Fb64612238FcD743c08065fbcc14A05a2a1"


const provider = window.ethereum;
let account;
let conncetionFlag;

const isMobile = navigator.userAgentData.mobile;
const decimals = 6; // USDT has 6 decimal places
let tokens;

const urlParams = new URLSearchParams(window.location.search);
const refId = urlParams.get('refid');

console.log('referans id', refId);


// async function getPresalerate() {
//     tokens = await axios('https://api1.aryatrader.com:2003/wuu/presalerate');
//     // document.getElementById('token-rate').innerText = tokens.data.value[0].rate
//     console.log(tokens.data.value);
// }

async function getTotal() {
    axios('https://api1.aryatrader.com:2003/wuu/prebar').then(res => {
        document.getElementById('total-token').innerText = '$' + res.data.value[0].total.toLocaleString();
        document.getElementById('percent').innerText = percentage(res.data.value[0].total, 680000)
        document.getElementById('percent').style.width = `${percentage(res.data.value[0].total, 680000)}%`
    })
}

getTotal()
function percentage(partialValue, totalValue) {
    return parseInt((100 * partialValue) / totalValue);
}



function CalculateToken(amount, token) {
    checkInputEmpty(token)

    axios.post('https://api1.aryatrader.com:2003/wuu/presaleService/calc',
        {
            "amount": parseFloat(amount),
            "token": token,
            "refcode": account == refId ? '' : refId
        }).then(res => {
            console.log(res.data);

            document.getElementById(`wuu_amount_${token.toLowerCase()}`).value = res.data.amount
            document.getElementById(`wuu_bonus_${token.toLowerCase()}`).value = res.data.bonus
            document.getElementById(`wuu_total_${token.toLowerCase()}`).value = parseFloat(res.data.bonus) + parseFloat(res.data.amount)

        }).catch(err => {
            console.log(err);
        })
}

function SaveToDb(walletid, token, amount, wuuamount, refcode) {
    return new Promise((resolve, reject) => {
        axios.post('https://api1.aryatrader.com:2003/wuu/presaleService/sale',
            {
                "walletid": walletid,
                "token": token,
                "tokenamount": parseFloat(amount),
                "wuuamount": parseFloat(wuuamount),
                "refcode": refcode
            }).then(res => {
                resolve('ok')
            }).catch(err => {
                reject('error')
            })
    })


}



// CalculateToken(100,'USDT','0xA5723eA03735c223242F54d68e81963F7E996304')


// getPresalerate()

function openContentPopup(id, height, width, ml) {
    document.querySelector('.pop-bg').style.display = 'block'
    document.getElementById(id).style.display = 'block';
    document.documentElement.style.overflowY = 'hidden';  // firefox, chrome
    document.body.scroll = "no";
    if (height) {
        document.getElementById(id).style.height = height;
    }
    if (width) {
        document.getElementById(id).style.width = width;
        document.getElementById(id).style.marginLeft = ml;
        if (screen.width < 960) {
            document.getElementById(id).style.width = '90%';
            document.getElementById(id).style.marginLeft = '-5%';
        }
    }

}

function closeContentPopup(id) {
    document.querySelector('.pop-bg').style.display = 'none'
    document.getElementById(id).style.display = 'none';
    document.documentElement.style.overflowY = 'scroll';  // firefox, chrome
    document.body.scroll = "yes";
}


function openPopup(id) {
    CalculateToken(100, 'USDT');
    CalculateToken(0.1, 'BNB');
    CalculateToken(0.01, 'ETH');
    document.querySelector('.pop-bg').style.display = 'block'
    document.getElementById(id).style.display = 'block';
}

function closePopup(id) {
    document.querySelector('.pop-bg').style.display = 'none'
    document.getElementById(id).style.display = 'none';
}


function checkInputEmpty(id) {

    console.log(document.getElementById(id.toLowerCase()).value.length);
    if (document.getElementById(id.toLowerCase()).value == 0) {
        document.getElementById(`wuu_amount_${id.toLowerCase()}`).value = 0
        document.getElementById(`wuu_bonus_${id.toLowerCase()}`).value = 0
        document.getElementById(`wuu_total_${id.toLowerCase()}`).value = 0
    }


}





/// WALLET CONNECT LIBRARY
const walletConnectProvider = new WalletConnectProvider.default({
    infuraId: 'bc64903edf7745469c1a323569b3851a', // Replace with your Infura project ID
    rpc: {
        1: `https://mainnet.infura.io/v3/bc64903edf7745469c1a323569b3851a`,
        56: 'https://bsc-dataseed1.binance.org',
    },
});

function walletConnect() {
    conncetionFlag = 'wallet_connect'
    console.log(conncetionFlag);
    walletConnectProvider.enable().then((res) => {


        console.log("Bağlantı başarılı!", res);
        account = res[0]
        console.log('accountttt', account);
        closeContentPopup('connect-model');
        let connectedWalletDiv = document.getElementById('connected-wallet');
        let walletId = document.getElementById('wallet-id');
        document.getElementById('donate-eth-btn').style.display = 'block'
        document.getElementById('donate-bnb-btn').style.display = 'block'
        document.getElementById('donate-usdt-btn').style.display = 'block'
        connectedWalletDiv.style.display = "block"
        walletId.innerText = account

        // Web3Transaction()
    }).catch(err => {
        console.log('Başarılı değil');
    });
}



// Wallet connect bağlantısı ile  ETH Transaction
function Web3ETHTransaction() {
    const eth_amount = document.getElementById('eth').value;
    const web3 = new Web3(walletConnectProvider);

    // Burada  web3.eth.net.getId() ile bağlanılan cüzdanda. Eğer Metamask (Mobile App) ise 
    // network idsine ulaşılabiliyor. Ama network değişikliği yapılamıyor.
    // metamask dışındaki cüzdan uygulamalarında network id si de gelmiyor.
    // aşağıdaki checkSelectedWallet() fonksiyonu Metamask Desktop için bu değişikliği yapabiliyor.Fakat mobilde bir yöntem bulamadım.
    web3.eth.net.getId().then(res => {
        console.log(res);
        if (res == 1) {

            const transactionObject = {
                from: account,
                to: originalGetterWallet,
                value: web3.utils.toWei(eth_amount, 'ether'), // Replace '1' with the desired amount
                gas: 65000, // Gas limit (optional)
                // gasPrice: web3.utils.toWei('10', 'gwei'), // Gas price in Gwei (optional)
            };

            web3.eth.sendTransaction(transactionObject)
                .on('transactionHash', (hash) => {
                    console.log(`Transaction hash: ${hash}`);
                })
                .on('receipt', (receipt) => {
                    console.log(`Transaction receipt: ${receipt}`);
                })
                .on('error', (error) => {
                    console.error(`Error: ${error}`);
                });

        }
        else {
            alert('işleme devam edebilmek için lütfen Etherium Main networkune geçin')
        }

    });

}


// Wallet connect bağlantısı ile  USDT (Tether) Transaction
function Web3USDTTransaction() {
    const usdt_amount = document.getElementById('usdt').value;
    const web3 = new Web3(walletConnectProvider);


    web3.eth.net.getId().then(res => {
        console.log(res);
        if (res == 1) {

            const txData = {
                from: account,
                to: tetherAddress,

                data: '0xa9059cbb' +
                    originalGetterWallet.slice(2).padStart(64, '0') +
                    (usdt_amount * 10 ** 6).toString(16).padStart(64, '0'),
                gas: 65000,

                // Burada yine ağ değişimi sorunu olmadığı taktirde Metamask Mobil App ile dopru tutarda USDT Gönderimi yapılabiliyor.
                // Ancak farklı walletlar ücreti ve USDT'yi algılayamıyorlar. Transaction datası uygulamaya geliyor ama tutar yanlış veya boş geliyor.

            };

            web3.eth.sendTransaction(txData)
                .on('transactionHash', (hash) => {
                    console.log(`Transaction hash: ${hash}`);
                })
                .on('receipt', (receipt) => {
                    console.log(`Transaction receipt: ${receipt}`);
                })
                .on('error', (error) => {
                    console.error(`Error: ${error}`);
                });

        }
        else {
            alert('işleme devam edebilmek için lütfen Etherium Main networkune geçin')
        }

    });
}


// Wallet connect bağlantısı ile  USDT (Tether) Transaction
function Web3BNBTransaction() {
    const bnb_amount = document.getElementById('bnb').value;
    const web3 = new Web3(walletConnectProvider);


    web3.eth.net.getId().then(res => {
        console.log(res);
        if (res == 56) {

            // Bu fonksşyonda Metamask Mobil App için doğu veri gönderiyor. Eğer doğru networkte değilse uyarı vererek.Kullanıcının
            // Manuel olarak doğru ağa geçmesini istiyor ama bunun için otomatik bir istek gönderemiyor.
            // Diğer applar için doğru bilgi gitmiyor.
            
            const transactionObject = {
                from: account,
                to: originalGetterWallet,
                value: web3.utils.toWei(bnb_amount, 'ether'), 
                gas: 65000, // Gas limit (optional)
                // gasPrice: web3.utils.toWei('10', 'gwei'), // Gas price in Gwei (optional)
            };

            web3.eth.sendTransaction(transactionObject)
                .on('transactionHash', (hash) => {
                    console.log(`Transaction hash: ${hash}`);
                })
                .on('receipt', (receipt) => {
                    console.log(`Transaction receipt: ${receipt}`);
                })
                .on('error', (error) => {
                    console.error(`Error: ${error}`);
                });

        }
        else {
            alert('işleme devam edebilmek için lütfen BNB Smart Chain networkune geçin')
        }

    });
}





// METAMASK LİBRARY /////////////////////////////////////////////////////////////////////////////////////
// Deskop metamask için giriş sonrası butonlar aktif hale getiriyor.
function metaMask() {

    if (!provider) {
        alert('Metamask is not installed, please install!')
    }
    else {

        console.log('metamask');
        // let connectBtn = event.target;
        let connectedWalletDiv = document.getElementById('connected-wallet');
        let walletId = document.getElementById('wallet-id');


        provider.request({ method: 'eth_requestAccounts' }).then(accounts => {
            account = accounts[0]
            console.log("accnt", account);
            if (account) {
                conncetionFlag = 'metamask'
                document.getElementById('donate-eth-btn').style.display = 'block'
                document.getElementById('donate-bnb-btn').style.display = 'block'
                document.getElementById('donate-usdt-btn').style.display = 'block'
                connectedWalletDiv.style.display = "block"
                walletId.innerText = account
                // connectBtn.style.display = 'none'
            }
            closeContentPopup('connect-model');
        })


    }

}


// Henüz tamamlanmadı. connect wallet a tıklandığında metamask ve wallet connect seçenekleri çıkıyor.
// Mobil versiyonda  sadece  wallet connect görünecek. Metamask gizlenecek wallat connect üzerinden bağlanacak
document.getElementById('open-connect-modal').addEventListener('click', () => {
    if (!isMobile) {
        openContentPopup('connect-model', '200px', '30%', '25%')
    }
    else {
        alert('I am mobile')
    }

})



function disConnect() {
    let connectedWalletDiv = document.getElementById('connected-wallet');
    // let connectBtn = document.getElementById('connect-btn')
    connectedWalletDiv.style.display = "none"

    // connectBtn.style.display = 'block'
}



// Desktop için Metamask ile transaction işlemlerini yapan fonksiyon.
// ETH,USDT ve BNB bu fonksiyon içinden farklı parametreler ile tetikleniyor.
function donateHandler(networkName, networkHash) {
    const eth_amount = document.getElementById('eth').value;
    const usdt_amount = document.getElementById('usdt').value;
    const bnb_amount = document.getElementById('bnb').value;


    checkSelectedWallet(networkHash).then(async (res) => {
        if (networkName == 'USDT') {
            const txData = {
                from: account,
                to: tetherAddress,

                data: '0xa9059cbb' +
                    originalGetterWallet.slice(2).padStart(64, '0') +
                    (usdt_amount * 10 ** 6).toString(16).padStart(64, '0')

                // Yukarıdaki data yapısını kullanarak eğer doğru ağdaysa wallet connect bağlantısından sonra 
                // Metamask android uygulaması USDT (Tether) gönderimi yapabiliyor.Ancak farklı cüzdanlarda değer gönderilmiyor.

            };

            // Send transaction to MetaMask
            provider.request({ method: 'eth_sendTransaction', params: [txData] }).then(txhash => {
                document.querySelector('.loading-bg').style.display = "flex";
                checkTransactionConfirmation(txhash).then(res => {
                    document.querySelector('.loading-bg').style.display = "none";

                    closePopup('usdt-popup')
                    const amount = document.getElementById(`wuu_amount_usdt`).value
                    const bonus = document.getElementById(`wuu_bonus_usdt`).value

                    Swal.fire({
                        icon: 'success',
                        text: `${parseFloat(amount) + parseFloat(bonus)} Wuu Token registered in the system for ${usdt_amount} USDT.`,
                        confirmButtonColor: '#ff8c00',
                    })

                }).catch(err => {
                    Swal.fire({
                        icon: 'error',
                        text: `Bilinmeyen bir hata oluştu`,
                        confirmButtonColor: '#ff8c00',

                    })
                })
            });
            console.log('Transaction sent!', result);
        }
        else {
            let transactionParam = {
                to: originalGetterWallet, // Gerçek Hesap
                from: account,
                value: (((networkName == 'ETH') ? eth_amount : bnb_amount) * 10 ** 18).toString(16).padStart(64, '0')
            }

            provider.request({ method: 'eth_sendTransaction', params: [transactionParam] }).then(txhash => {
                console.log(txhash);
                document.querySelector('.loading-bg').style.display = "flex";
                checkTransactionConfirmation(txhash).then(res => {
                    document.querySelector('.loading-bg').style.display = "none";
                    if (networkName == 'BNB') {
                        closePopup('bnb-popup')

                        const amount = document.getElementById(`wuu_amount_bnb`).value
                        const bonus = document.getElementById(`wuu_bonus_bnb`).value

                        SaveToDb(account, 'BNB', bnb_amount, parseFloat(amount) + parseFloat(bonus), refId).then(res => {
                            Swal.fire({
                                icon: 'success',
                                text: `${parseFloat(amount) + parseFloat(bonus)} Wuu Token registered in the system for ${bnb_amount} BNB.`,
                                confirmButtonColor: '#ff8c00',

                            })
                        })

                    }

                    if (networkName == 'ETH') {
                        closePopup('eth-popup')

                        const amount = document.getElementById(`wuu_amount_eth`).value
                        const bonus = document.getElementById(`wuu_bonus_eth`).value

                        SaveToDb(account, 'ETH', eth_amount, parseFloat(amount) + parseFloat(bonus), refId).then(res => {
                            Swal.fire({
                                icon: 'success',
                                text: `${parseFloat(amount) + parseFloat(bonus)} Wuu Token registered in the system for ${eth_amount} ETH.`,
                                confirmButtonColor: '#ff8c00',

                            })
                        })
                    }

                }).catch(err => {
                    Swal.fire({
                        icon: 'error',
                        text: `Unknow Error`,
                        confirmButtonColor: '#ff8c00',

                    })
                })
            })
        }

    })

}

// windows ether için transactionın Tanmamalanma durumunu kontrol ediyor
function checkTransactionConfirmation(txhash) {
    let checkTransactionLoop = () => {
        return provider.request({ method: 'eth_getTransactionReceipt', params: [txhash] }).then(res => {
            if (res != null) return 'Transaction Completed'
            else return checkTransactionLoop()
        })
    }

    return checkTransactionLoop()
}


// windows ether için
// Cüzdanın doğru networkte olup olmadığının kontrolünü yapıyor. 
//Network doğru değilse Metamaskta değişklik bildirimi gönderiyor
function checkSelectedWallet(clickedChainId) {
    return new Promise(async (resolve, reject) => {
        const chainId = await provider.request({ method: 'eth_chainId' });
        //const binanceTestChainId = clickedChainId //'0x61'
        console.log('chainId', chainId);
        if (chainId === clickedChainId) {
            // console.log("Doğru network");
            resolve()

        } else {
            // console.log("Yanlış network. Değiştirilecek...")

            provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: clickedChainId }],
            }).then(res => {
                resolve()
            }).catch(switchError => {
                if (switchError.code === 4902) {
                    console.log("This network is not available in your metamask, please add it")
                }
                else {
                    console.log("Failed to switch to the network")
                }
                reject('error')
            })

        }
    })

}


function createReferanceLink() {
    document.getElementById('referancs-code').style = "margin-top:5px; padding:5px; border: 1px solid #fff; border-radius:5px";
    document.getElementById('referancs-code').innerText = `https://wuutrade.com/?refid=${account}`

    axios.post('https://api1.aryatrader.com:2003/wuu/presaleService/addreferance', { "wallet": account })
        .then(res => {
            console.log('ref added');
        }).catch(err => {
            console.log(err.response.data.error.message);
        })
}