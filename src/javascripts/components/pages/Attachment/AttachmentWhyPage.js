import { Component } from 'react'
import GoBackButton from '../../modules/GoBackButton'
import { Link } from 'react-router'

class AttachmentWhyPage extends Component{
    constructor(){
        super()
    }
    
    render(){
        return (
            <div className="center_block">
                <section className="full_profile_header">
                    <div className="left_angle_block">
                        <GoBackButton/>
                    </div>
                    <div className="mid_header_block left_position">
                        <span className="top_line_left">telemed.</span>
                    </div>
                </section>

                <section className="info_section_block more_bot_pad">
                    <div className="icon_graph big_farma_icon"></div>
                    <div className="step_block_cell width_step470">
                        <div className="header_name">
                            Зачем мне <br />
                            прикрепляться?
                        </div>
                        <div className="description_txt_block">
                            <div>
                                Прикрепление откроет полный функционал <br />
                                сайта, позволит записываться на прием <br />
                                к врачам и вызывать специалиста на дом.
                            </div>
                        </div>
                    </div>
                </section>
                <section className="info_section_block more_bot_pad">
                    <div className="step_block_cell width_step320">
                        <div className="med_header_header">
                            Обязательно на сайте?
                        </div>
                        <div className="description_txt_block pad_right_txt">
                            <div>
                                Нет, не обязательно. Прикрепиться можно и в поликлинике, подав необходимые документы в пункт регистрации.
                            </div>
                        </div>
                    </div>
                    <div className="step_block_cell width_step320">
                        <div className="med_header_header">
                            Это безопасно?
                        </div>
                        <div className="description_txt_block pad_right_txt">
                            <div>
                                Вполне, в России действует закон «о защите персональных данных» — ему подчиняются все интернет-проекты страны.
                            </div>
                        </div>
                    </div>
                    <div className="step_block_cell width_step320">
                        <div className="med_header_header">
                            Что понадобится?
                        </div>
                        <div className="description_txt_block pad_right_txt">
                            <div>
                                Для начала выбрать поликлинику, а потом указать: свои паспортные данные, полис ОМС и контактную информацию.
                            </div>
                        </div>
                    </div>
                </section>

                <section className="info_section_block">
                    <div className="btn_placeholder right_float">
                        <button className="btn_style" type="button">Приступить</button>
                    </div>
                    <div className="icon_graph left_pos question_icon"></div>
                    <div className="description_txt_block note_left_pad">
                        <div>
                            <span>Остались вопросы? </span><a href="/feedback"> Напишите нам</a>
                        </div>
                    </div>
                </section>


                <div className="static_foot_info">
                    <div className="copy_right">Nephrology Expert Council</div>
                    <div className="foot_clin_name">
                        <Link to="/index">
                            <div className="small_icon_bot"></div>
                        </Link>
                    </div>
                    <Link className="link_foot_style" to="/feedback">Помощь</Link>
                    <Link className="link_foot_style" to="/agreement">Правовая информация</Link>
                    <Link className="link_foot_style" to="/about">О сайте</Link>
                </div>

            </div>
        );
    }
}

export default AttachmentWhyPage;
