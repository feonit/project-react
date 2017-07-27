import translate from '../../i18n/Translate'
import { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class CabinetEmptyPage extends Component{
    constructor(props){
        super(props)
    }

    render(){
        var trans = this.props.trans;

        return (
            <div className="background_fill show_block">
                <div className="center_popup">
                    <div className="main_center_block set_small_width">
                        <div className="icon_image_block calendar_logo"></div>
                        <section className="section_block">
                            <h1 className="large_font">
                                <p>{trans.hello}, {this.props.userName}!</p>
                            </h1>
                        </section>
                        <section className="section_block">
                            {trans.empty_message}
                        </section>
                        <section className="section_block">
                            <Link className="btn_style blue" type="button" to="/meeting/create">{trans.make_meeting}</Link>
                        </section>
                        <section className="section_block">
                            <div className="txt_note_block">
                                {/*<a to="/cabinet?fake_data=true">(переход на эту же страницу с фековыми данными)</a>--*/}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

CabinetEmptyPage.propsTypes = {
    userName: PropTypes.string
}

CabinetEmptyPage.defaultProps = {
    userName: "Anonymous"
}

export default translate("CabinetEmptyPage")(CabinetEmptyPage);