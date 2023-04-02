import axios from 'axios';
import React from "react";
import Table from './Table';

class Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            presenting: false,
            zipcode: null,
            serviceProviders: []
        };
    }

    getServiceProviders(e) {
        e.preventDefault();
        let url = "http://localhost:5000/recommend_nurses/" + this.state.zipcode + "/10";
        console.log(url);
        axios.get(url).then((response) => {
            console.log(response.data);
            this.setState({
                serviceProviders: response.data,
            });
        });
        this.setState({
            presenting: !this.state.presenting
        })
    }

    handleReset(e) {
        e.preventDefault()
        this.setState({ presenting: false })
    }

    serviceProviderHeadings() {
        return Object.keys({
            "Gender": null,
            "Last_Name": null,
            "Overall_Rating": null,
            "Phone_Number": null
        });
    }

    render() {
        if (!this.state.presenting) {
            return <div>
                <img src="https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_54c1e367d8d496b2a5393571392362a5/axxess-homecare.png" alt="logo"/>
                <form onSubmit={(e) => this.getServiceProviders(e)}>
                    <h3>Please Enter The Zip Code Below</h3>
                    <input
                        type="text"
                        name="Zip Code"
                        onChange={(e) => this.setState({ zipcode: e.target.value })}
                    />
                    <input type="submit" value="Show" />
                </form>
            </div>
        }
        return <div>
            <h4>Top Healthcare Providers In Your Zip Code</h4>
            <div>
                <Table theadData={this.serviceProviderHeadings()} tbodyData={this.state.serviceProviders} />
            </div>
            <hr style={{ color: 'black', height: 5 }} />
            <button onClick={(e) => this.handleReset(e)}>Reset</button>
        </div>
    }
}

export default Service;