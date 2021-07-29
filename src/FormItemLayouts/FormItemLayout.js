import React from 'react';
import './FormItemLayout.css';

class FormItemLayout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showProperties: false
        }
    }

    removeItem = id => e => {
        e.preventDefault();
        this.props.remove(id.itemId)
    }

    render() {
        const {label, formItemType, itemId, required} = this.props.data // destructure prop object into variables
        switch (formItemType) {
            case "lgText": 
            return (
                <div className="ItemLayout lgText">
                    <h3>{label}</h3>
                    <textarea />
                    <br />
        
                    <button onClick={this.removeItem({itemId})}>Remove Item</button>
                    <button onClick={() => this.setState({showProperties: !this.state.showProperties})}>Toggle Properties</button>
                    <div style={{display: this.state.showProperties ? "block" : "none"}}>
                        <hr />
                        <p>Type: Large Text Box (AlphaNumerical)</p>
                        <p>Required: {required}</p>
                        <p>ID: {itemId}</p>
                    </div> 
                </div>
            );
        case "text": 
        return (
            <div className="ItemLayout text">
                <h3>{label}</h3>
                <input type="text" />
                <br />
                  
                <button onClick={this.removeItem({itemId})}>Remove Item</button>
                <button onClick={() => this.setState({showProperties: !this.state.showProperties})}>Toggle Properties</button>
                <div style={{display: this.state.showProperties ? "block" : "none"}}>
                    <hr />
                    <p>Type: Small Text Box (AlphaNumerical)</p>
                    <p>Required: {required}</p>
                    <p>ID: {itemId}</p>
                </div>  
            </div>
        );
        case "number":
            return (
                <div className="ItemLayout text">
                    <h3>{label}</h3>
                    <input type="text" />
                    <br />

                    <button onClick={this.removeItem({itemId})}>Remove Item</button>
                    <button onClick={() => this.setState({showProperties: !this.state.showProperties})}>Toggle Properties</button>
                    <div style={{display: this.state.showProperties ? "block" : "none"}}>
                        <hr />
                        <p>Type: Small Text Box (Numerical)</p>
                        <p>Required: {required}</p>
                        <p>ID: {itemId}</p>
                    </div>
                </div>
            )

        case "radioBtnGroup":
            return (
                <div className="ItemLayout radioBtnGroup">
                    <h3>{label}</h3>
                    <div>
                        <form>
                        {
                            ( this.props.data.items !== undefined && this.props.data.items.length > 0 ) ? this.props.data.items.map( (item, index) => {
                                return  (
                                    <div key={Math.random()}>
                                        <input type="radio" name="radioBtn" id={index+item} value={item}/>
                                        <label htmlFor={index+item}>{item}</label>
                                    </div>

                                )
                                }) : <p>Error loading items. Please delete this section and try again.</p>
                        }
                        </form>
                    </div>

                    <button onClick={this.removeItem({itemId})}>Remove Item</button>
                    <button onClick={() => this.setState({showProperties: !this.state.showProperties})}>Toggle Properties</button>
                    <div style={{display: this.state.showProperties ? "block" : "none"}}>
                        <hr />
                        <p>Type: {formItemType}</p>
                        <p>Required: {required}</p>
                        <p>ID: {itemId}</p>
                    </div>
                </div>
            );

        case "checkboxGroup":
            return (
                <div className="ItemLayout checkboxGroup">
                <h3>{label}</h3>
                <div>
                    <form>
                    {
                        ( this.props.data.items !== undefined && this.props.data.items.length > 0 ) ? this.props.data.items.map( (item, index) => {
                            return  (
                                <div key={Math.random()}>
                                    <input type="checkbox" name="checkbox" id={index+item} value={item}/>
                                    <label htmlFor={index+item}>{item}</label>
                                </div>

                            )
                            }) : <p>Error loading items. Please delete this section and try again.</p>
                    }
                    </form>
                </div>
                <button onClick={this.removeItem({itemId})}>Remove Item</button>
                <button onClick={() => this.setState({showProperties: !this.state.showProperties})}>Toggle Properties</button>
                <div style={{display: this.state.showProperties ? "block" : "none"}}>
                        <hr />
                        <p>Type: {formItemType}</p>
                        <p>Required: {required}</p>
                        <p>ID: {itemId}</p>
                    </div>
            </div>
            )
        
        case "date":
            return (
                <div className="ItemLayout date">
                    <h3>{label}</h3>
                    <input type="date" />
                    <br />
    
                    <button onClick={this.removeItem({itemId})}>Remove Item</button>
                    <button onClick={() => this.setState({showProperties: !this.state.showProperties})}>Toggle Properties</button>
                   
                    <div style={{display: this.state.showProperties ? "block" : "none"}}>
                        <hr />
                        <p>Type: {formItemType}</p>
                        <p>Required: {required}</p>
                        <p>ID: {itemId}</p>
                    </div>
                </div>
            );

        case "photo":
            return (
                <div className="ItemLayout map">
                    <h3>{label}</h3>
                    <input type="file" />
                    <br />

                    <button onClick={this.removeItem({itemId})}>Remove Item</button>
                    <button onClick={() => this.setState({showProperties: !this.state.showProperties})}>Toggle Properties</button>

                    <div style={{display: this.state.showProperties ? "block" : "none"}}>
                        <hr />
                        <p>Type: {formItemType}</p>
                        <p>Required: {required}</p>
                        <p>ID: {itemId}</p>
                    </div>
                </div>
            );
        case "map":
            return (
                <div className="ItemLayout map">
                    <h3>{label}</h3>
                    <h3>Map element here (use JS SDK)</h3>

                    <button onClick={this.removeItem({itemId})}>Remove Item</button>
                    <button onClick={() => this.setState({showProperties: !this.state.showProperties})}>Toggle Properties</button>
                    
                    <div style={{display: this.state.showProperties ? "block" : "none"}}>
                        <hr />
                        <p>Type: {formItemType}</p>
                        <p>Required: {required}</p>
                        <p>ID: {itemId}</p>
                    </div>
                </div>
            );
            
        default:
            return (
                <div className="ItemLayout default">
                    <h3>{label}</h3>
                    <h3>UnKnown item selected</h3>
    
                    <button onClick={this.removeItem({itemId})}>Remove Item</button>
                    <button onClick={() => this.setState({showProperties: !this.state.showProperties})}>Toggle Properties</button>
                    
                    <div style={{display: this.state.showProperties ? "block" : "none"}}>
                        <hr />
                        <p>Type: {formItemType}</p>
                        <p>Required: {required}</p>
                        <p>ID: {itemId}</p>
                    </div>
                </div>
            );
        }

    }
}
export default FormItemLayout;



