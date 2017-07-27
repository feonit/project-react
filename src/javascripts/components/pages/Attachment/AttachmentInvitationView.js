import translate from '../../../i18n/Translate'
import { Component } from 'react'
import { Link } from 'react-router'
import FooterMenu from '../../modules/FooterMenu'

class AttachmentInvitationView extends Component{
    constructor(){
        super()
    }

    render() {
        const trans = this.props.trans;
    
        return (
            <div className="static_overflow">
                <div className="bg_overflow right_position login_doc_image mobile-white_bg"></div>
                <div className="main_content mobile-white_bg">
                    <div className="mid_header_block pad_top_regular">
                        <Link title="Профиль" to="/profile" className="profile_item_block white_icon"></Link>
                    </div>
                    <div className="white_mask sucess_block mobile-static_mask">
                        <div className="mid_angle_block no_left_marg">
                            <section className="profile_header_links">
                                <span className="top_line_left">telemed.</span>
                            </section>
                            <section className="mid_center_block pad_bot_small mobile-reg_pad">
                                <section className="step_block_cell width_step250 triple_column">
                                    <div className="icon_graph big_farma_icon"></div>
                                    <div className="sucess_header_info pad_bot">
                                        Прикрепитесь <br /> к поликлинике
                                    </div>
                                    <div className="med_font_description default_font pad_bot_small">
                                        Прикрепление откроет полный функционал сайта. <br />
                                        Позволит записываться на прием к врачам <br />
                                        и вызывать специалистов на дом.
                                    </div>
                                    <div className="btn_placeholder">
                                        <Link className="btn_style" to="/attachment/clinic">Прикрепиться</Link>
                                    </div>
                                </section>
                            </section>
                            <section className="form_container_section">
                                <section className="step_block_cell width_step250 triple_column">
                                    <div className="icon_graph question_icon"></div>
                                    <div className="med_font_description default_font pad_bot_small">
                                        <p>Зачем необходимо прикрепление и что мне это даст? </p>
                                        <p><Link to="/attachment/why">больше о прикреплении</Link> </p>
                                    </div>
                                </section>
                            </section>
                        </div>
                        <div className="bot_icon_container">
                            <Link href="/index">
                                <div className="small_icon_bot"></div>
                            </Link>
                        </div>
                        <FooterMenu />
    
                    </div>
                </div>
            </div>
        );
    }
}
export default translate("AttachmentInvitation")(AttachmentInvitationView);