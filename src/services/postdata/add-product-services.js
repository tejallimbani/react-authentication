import Axios from 'axios'

export default function PostData( productData ) {
    console.log(productData);
    console.log(localStorage.getItem('userToken'));
    let BaseUrl = 'http://127.0.0.1:8000/api/';

    return Axios.post(BaseUrl+'add-product', {
            name: productData.name,
            description: productData.description,
            bathroom: productData.bathroom,
            bedroom: productData.bedroom,
            area: productData.area,
            price: productData.price,
            address: productData.address,
            product_type: productData.product_type,
            product_space: productData.product_space,
            author: productData.author
        }, {
            headers: { Authorization: `bearer ${localStorage.getItem('userToken')}`}
        },
        )
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
}