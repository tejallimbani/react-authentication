import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from 'react-google-maps'
import Autocomplete from 'react-google-autocomplete'
import Geocode from 'react-geocode'

Geocode.setApiKey("AIzaSyARYUp-49qs7GFF1T7p0UPOjhquvMReAHk");
Geocode.enableDebug();

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            }
        }

        this.getCity = this.getCity.bind(this);
        this.getArea = this.getArea.bind(this);
        this.getState = this.getState.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onPlaceSelected = this.onPlaceSelected.bind(this);
        this.onMarkerDragEnd = this.onMarkerDragEnd.bind(this);
    }

    componentDidMount() {
        Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng)
        .then(response => {
            const address = response.results[0].formatted_address,
                addressArray = response.results[0].address_components,
                city = this.getCity( addressArray ),
                area = this.getArea( addressArray ),
                state = this.getState( addressArray );

                console.log( 'city', city, area, state );

                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                })
        },
        error => {
            console.error(error);
        }
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.markerPosition.lat !== this.props.center.lat ||
            this.state.address !== nextState.address ||
            this.state.city !== nextState.city ||
            this.state.area !== nextState.area ||
            this.state.state !== nextState.state
            ) {
            return true;
        } else if (this.props.center.lat === nextProps.center.lat) {
            return false;
        }
    }

    getCity( addressArray ) {
        let city = '';
        for(let i = 0; i < addressArray.length; i++) {
            if( addressArray[i].types[0] 
                && 'administrative_area_level_2' === addressArray[i].types[0] ) {
                    city = addressArray[i].long_name;
                    return city;
            }
        }
    }

    getArea( addressArray ) {
        let area = '';
        for(let i = 0; i < addressArray.length; i++) {
            if( addressArray[i].types[0] ) {
                for( let j = 0; j < addressArray[i].types.length; i++ ){
                    if('sublocality_level_1' === addressArray[i].types[j] || 
                    'locality' === addressArray[i].types[j] ) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    }

    getState( addressArray ) {
        let state;
        for(let i = 0; i < addressArray.length; i++) {
            for(let i = 0; i < addressArray.length; i++) {
                if( addressArray[i].types[0] && 
                    'administrative_area_level_1' === addressArray[i].types[0]
                    ) {
                        state = addressArray[i].long_name;
                        return state
                }
            }
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onInfoWindowClose(e) {

    }

    onPlaceSelected( place ) {
        console.log(place);
        const address = place.formatted_address,
           addressArray =  place.address_components,
           city = this.getCity( addressArray ),
           area = this.getArea( addressArray ),
           state = this.getState( addressArray ),
           latValue = place.geometry.location.lat(),
           lngValue = place.geometry.location.lng();
        
        // Set these values in the state.
        this.setState({
            address: ( address ) ? address : '',
            area: ( area ) ? area : '',
            city: ( city ) ? city : '',
            state: ( state ) ? state : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
    };
        
    onMarkerDragEnd( event ) {
        console.log( 'event', event );
        let newLat = event.latLng.lat(),
           newLng = event.latLng.lng(),
           addressArray = [];
        
        Geocode.fromLatLng( newLat , newLng ).then(
           response => {
            const address = response.results[0].formatted_address,
            addressArray =  response.results[0].address_components,
            city = this.getCity( addressArray ),
            area = this.getArea( addressArray ),
            state = this.getState( addressArray );
        
            this.setState( {
                address: ( address ) ? address : '',
                area: ( area ) ? area : '',
                city: ( city ) ? city : '',
                state: ( state ) ? state : ''
            } )
        },
        error => {
            console.error(error);
        }
        );
    };

    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap
                        google={this.props.google}
                        defaultZoom={this.props.zoom}
                        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                    >

                    <Autocomplete
                        style={{
                            width: '100%',
                            height: '40px',
                            paddingLeft: '16px',
                            marginTop: '2px',
                            marginBottom: '100px'
                        }}
                        onPlaceSelected={ this.onPlaceSelected }
                        types={['(regions)']}
                    />

                    <Marker google={this.props.google}
                        name={'Dolores park'}
                            draggable={true}
                            onDragEnd={ this.onMarkerDragEnd }
                                position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                        />
                    <Marker />

                    <InfoWindow
                        onClose={this.onInfoWindowClose}
                        position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
                        >
                        <div>
                            <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
                        </div>
                    </InfoWindow>

                    </GoogleMap>
                )
            )
        );

        let map;
        if(this.props.center.lat !== undefined){
            map =   <div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input 
                                type="text" 
                                name="city"
                                className="form-control"
                                readOnly="readOnly"
                                value={this.state.city}
                                onChange={ this.onChange }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="area">Area</label>
                            <input 
                                type="text" 
                                name="area"
                                className="form-control"
                                readOnly="readOnly"
                                value={this.state.area}
                                onChange={ this.onChange }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <input 
                                type="text" 
                                name="state"
                                className="form-control"
                                readOnly="readOnly"
                                value={this.state.state}
                                onChange={ this.onChange }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input 
                                type="text" 
                                name="address"
                                className="form-control"
                                readOnly="readOnly"
                                value={this.state.address}
                                onChange={ this.onChange }
                            />
                        </div>
                        <div className="form-group">
                        <AsyncMap 
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyARYUp-49qs7GFF1T7p0UPOjhquvMReAHk&libraries=places`}
                            loadingElement={
                                <div style={{ height: `100%` }} />
                            }
                            containerElement={
                                <div style={{ height: this.props.height }} />
                            }
                            mapElement={
                                <div style={{ height: `100%` }} />
                            }
                        />
                        </div>
                    </div>
        } else {
            map = <div style={{ height: this.props.height }} />
        }
        return (map);
    }
}

export default Map;