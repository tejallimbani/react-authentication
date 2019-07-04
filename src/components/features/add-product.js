import React from 'react'

import PostData from '../../services/postdata/add-product-services'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class AddProduct extends React.Component {

    //AIzaSyBW4OTZsSQyjBPAG1sYV6ph8ObsRy9a1OA

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            bathroom: '',
            bedroom: '',
            area: '',
            price: '',
            address: '',
            product_type: '',
            product_space: '',
            author: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLocationSelect = this.handleLocationSelect.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit(e) {
        PostData(this.state).then((response) => {
            console.log(response);
        });
        e.preventDefault();
    }

    handleLocationChange(address) {
        this.setState({ address });
    }

    handleLocationSelect(address) {
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latlng => console.log('success', latlng ))
        .then(error => console.error('Error', error ))
    }

    render() {
        return (
            <div>
                <h3>Add Product</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            rows={5}
                            value={this.state.description}
                            onChange={this.handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bathroom">Bathroom</label>
                        <select
                            name="bathroom"
                            id="bathroom"
                            value={this.state.bathroom}
                            onChange={this.handleChange}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="3+">3+</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bedroom">Bedroom</label>
                        <select
                            name="bedroom"
                            id="bedroom"
                            value={this.state.bedroom}
                            onChange={this.handleChange}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="4+">4+</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="area">Area</label>
                        <input 
                            type="text"
                            name="area"
                            id="area"
                            value={this.state.area}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input 
                            type="text"
                            name="price"
                            id="price"
                            value={this.state.price}
                            onChange={this.handleChange}
                        />
                    </div>
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleLocationChange}
                        onSelect={this.handleLocationSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                                />
                                <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                            )}
                    </PlacesAutocomplete>
                    <div className="form-group">
                        <label htmlFor="product_type">Product Type</label>
                        <select
                            name="product_type"
                            id="product_type"
                            value={this.state.product_type}
                            onChange={this.handleChange}
                        >
                            <option value="sell">Sell</option>
                            <option value="rent">Rent</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_space">Product Space</label>
                        <input 
                            type="text"
                            name="product_space"
                            id="product_space"
                            value={this.state.product_space}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input 
                            type="text"
                            name="author"
                            id="author"
                            value={this.state.author}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="submit"
                            value="Add"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default AddProduct;