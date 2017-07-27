import { Component, PropTypes } from 'react'
import classNames from 'classnames'
import './index.scss'

class CustomSelect extends Component{
    constructor(props){
        super(props)
        this.state = { isOpen: false }
        this.onToggleView = this.onToggleView.bind(this)
        this.selectItem = this.selectItem.bind(this)
    }

    onToggleView(event){
        event.stopPropagation();
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    selectItem(id){
        this.setState({
            value: id,
            isOpen: false
        }, ()=>{
            var event = new Event("change", {bubbles: true, cancelable: true});
    
            Object.defineProperties(event, {
                target: {
                    value: {
                        value: id
                    },
                    writable: true
                }
            });
    
            if (this.props.onChange){
                this.props.onChange(event)
            }
        })
    }
    
    render(){
        var name = '';

        if (this.props.value){
            var find = this.props.items.find((item)=>{
                return item.id == this.props.value
            });
            if (find){
                name = find.name
            }
        }

        var index = this.state.isOpen ? {zIndex: 1000} : {};

        return (
            <div className="select_wrapper" style={index}>
                <div onClick={this.onToggleView} className={classNames("select-mask", { "hidden": !this.state.isOpen })}></div>
                <div>
                    <div
                        className={classNames("select_label_name", {"open": this.state.isOpen, "filled": this.props.value || this.state.isOpen})}
                        data-name={this.props.title}
                        onClick={this.onToggleView}
                    >

                        <div className="select_txt_holder">{name}</div>
                    </div>
                    <div className="select_dropdownlist">
                        {this.props.items.map((item)=>{ return(
                            <div key={item.id} className="select_item" onClick={this.selectItem.bind(null, item.id)}>
                                {item.name}
                            </div>
                        )})}
                    </div>
                </div>
            </div>
        )
    }
}

CustomSelect.ptopTypes = {
    onChange: PropTypes.func
}

CustomSelect.defaultProps = {
    title: "no title",
    value: '',
    items: []//[{id: 1, name: "Калуга"}, {id: 2, name: "Москва"}]
}

export default CustomSelect