export const useCartStore = defineStore('cart', {
    state: () => ({ 
        carts: {}, 
    }),
    actions: {
        getCartData(){
            this.carts = JSON.parse(sessionStorage.getItem('carts'));
        },

        async AddToCart(product){
            const toaster = useToasterStore();


            let existingData = JSON.parse(sessionStorage.getItem('carts'))?.products || [];
            if(existingData?.length > 0){
                if (sessionStorage.getItem("carts") === null) {
                    sessionStorage.setItem("carts", JSON.stringify({ products: [], quantity: 0, sum: 0 }));
                }
                let pdt = existingData?.find(item => item?.id === product?.id);
                if(parseInt(pdt?.id) > 0){
                    if(parseInt(pdt.qty) == parseInt(product.qty)){
                        toaster.addInfo('This Product Already Added!');
                    }else{
                        existingData[existingData.indexOf(pdt)].qty = parseInt(product.qty);
                        sessionStorage.setItem('carts', JSON.stringify({ products: existingData, quantity: 0, sum: 0 }));
                        const result = existingData.reduce((acc, item) => {
                            // acc.product.push(item.product);
                            acc.quantity += item.qty;
                            acc.sum += item.qty * item.price;
                            return acc;
                        }, { 
                                // product: [], 
                                quantity: 0, 
                                sum: 0 
                            });
                        if(result){
                            sessionStorage.setItem('carts', JSON.stringify({ products: existingData, quantity: result.quantity, sum: result.sum }));
                            this.carts = JSON.parse(sessionStorage.getItem('carts'));
                            toaster.addSuccess('Product Update Success!');
                        }
                    }
                }else{
                    existingData.push(product);
                    sessionStorage.setItem('carts', JSON.stringify({ products: existingData, quantity: 0, sum: 0 }));
                    const result = existingData.reduce((acc, item) => {
                        // acc.product.push(item.product);
                        acc.quantity += item.qty;
                        acc.sum += item.qty * item.price;
                        return acc;
                    }, { 
                            // product: [], 
                            quantity: 0, 
                            sum: 0 
                        });
                    if(result){
                        sessionStorage.setItem('carts', JSON.stringify({ products: existingData, quantity: result.quantity, sum: result.sum }));
                        this.carts = JSON.parse(sessionStorage.getItem('carts'));
                        toaster.addSuccess('Product Added Success!');
                    }
                }
            }else{
                if (sessionStorage.getItem("carts") === null) {
                    sessionStorage.setItem("carts", JSON.stringify({ products: [], quantity: 0, sum: 0 }));
                }
                existingData.push(product);
                sessionStorage.setItem('carts', JSON.stringify({ products: existingData, quantity: 0, sum: 0 }));

                const result = existingData.reduce((acc, item) => {
                    // acc.product.push(item.product);
                    acc.quantity += item.qty;
                    acc.sum += item.qty * item.price;
                    return acc;
                }, { 
                        // product: [], 
                        quantity: 0, 
                        sum: 0 
                    });
                if(result){
                    sessionStorage.setItem('carts', JSON.stringify({ products: existingData, quantity: result.quantity, sum: result.sum }));
                    this.carts = JSON.parse(sessionStorage.getItem('carts'));
                    toaster.addSuccess('Product Added Success!');
                }
            }
        },
    }
})


// const myArray = ['a', 'b', 'c', 'd'];

// // convert array to JSON string using JSON.stringify()
// const jsonArray = JSON.stringify(myArray);

// // save to localStorage using "array" as the key and jsonArray as the value
// localStorage.setItem('array', jsonArray);

// // get the JSON string from localStorage
// const str = localStorage.getItem('array');

// // convert JSON string to relevant object
// const parsedArray = JSON.parse(str);

// console.log(parsedArray);
