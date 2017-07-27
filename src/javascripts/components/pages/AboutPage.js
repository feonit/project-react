import { Component } from 'react'
import { Link } from 'react-router'
import GoBackButton from '../modules/GoBackButton'

export default class AboutPage extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <div className="center_block">
                <section className="full_profile_header">
                    <div className="left_angle_block fixed_arrow">
                        <GoBackButton/>
                    </div>
                    <div className="mid_header_block left_position">
                        <Link className="top_line_left" to="/calendar">telemed.</Link>
                    </div>
                </section>
                <section className="info_section_block">
                    <div className="step_block_cell width_step640">
                        <div className="header_name">
                            О сайте <br />
                            «Теледоктор»
                        </div>
                    </div>
                    <div className="step_block_cell mobile-none">
                        <div className="icon_graph left_pos about_company_icon"></div>
                    </div>
                </section>
                <section className="info_section_block more_bot_pad">
                    <div className="step_block_cell width_step640">
                        <div className="description_txt_block text_border540">
                            <div>«Теледоктор» — медицинский онлайн-сервис. Он позволяет удаленно прикрепиться к поликлинике, записываться на прием к специалистам, планировать и вести историю приемов, получать данные анализов и рекомендаций.</div>
                        </div>
                    </div>
                    <div className="step_block_cell mobile-none">
                        <div className="description_txt_block about_icon_desc">
                            <p className="big_header_paraq">Узнать больше</p>
                            <p>
                                <span>В своей поликлинике, либо </span> <br />
                                <Link to="/feedback">написав нам</Link>
                            </p>
                        </div>
                    </div>
                </section>
                <section className="info_section_block more_bot_pad mobile-show">
                    <div className="icon_graph left_pos question_icon"></div>
                    <div className="description_txt_block note_left_pad">
                        <div>
                            <span>Остались вопросы?</span> <Link to="/feedback">Напишите нам</Link>
                        </div>
                    </div>
                </section>
                <div className="main_foot_info">
                    <div className="copy_right">Nephrology Expert Council</div>
                    <a className="link_foot_style" href="#">Помощь</a>
                    <a className="link_foot_style" href="#">Правовая информация</a>
                    <a className="link_foot_style" href="#">О сайте</a>
                </div>
                <div className="bot_icon_container">
                    <Link to="/index">
                        <div className="small_icon_bot"></div>
                    </Link>
                </div>
            </div>
        );
    }
}