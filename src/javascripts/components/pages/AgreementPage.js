import { Component } from 'react'
import { Link } from 'react-router'
import GoBackButton from '../modules/GoBackButton'

export default class AgreementPage extends Component{
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
				<section className="info_section_block more_bot_pad">
					<div className="step_block_cell width_step640">
						<div className="header_name">
							Пользовательское <br />
							соглашение
						</div>
						<div className="description_txt_block text_border540 pad_top_small">
							<p className="header_paraq">1. ОБЩИЕ ПОЛОЖЕНИЯ</p>
							<p>1.1. Настоящее Пользовательское соглашение (далее – Соглашение) относится к сайту Интернет-магазина «название интернет-магазина», расположенному по адресу адрес интернет-магазина, и ко всем соответствующим сайтам, связанным с сайтом www.адрес интернет-магазина. </p>
							<p>1.2. Сайт Интернет-магазина « название интернет-магазина»  (далее – Сайт) является собственностью название организации, предприятия</p>
							<p>1.3. Настоящее Соглашение регулирует отношения между Администрацией сайта Интернет-магазина «название интернет-магазина»  (далее – Администрация сайта) и Пользователем данного Сайта.</p>
							<p>1.4. Администрация сайта оставляет за собой право в любое время изменять, добавлять или удалять пункты настоящего Соглашения без уведомления Пользователя.</p>
							<p>1.5. Продолжение использования Сайта Пользователем означает принятие Соглашения и изменений, внесенных в настоящее Соглашение.</p>
							<p>1.6. Пользователь несет персональную ответственность за проверку настоящего Соглашения на наличие изменений в нем. </p>
						</div>
						<div className="description_txt_block text_border540">
							<p className="header_paraq">2. ОПРЕДЕЛЕНИЯ ТЕРМИНОВ </p>
							<p>2.1. Перечисленные ниже термины имеют для целей настоящего Соглашения следующее значение: </p>
							<p>2.1.1 «название интернет-магазина» – Интернет-магазин, расположенный на доменном имени www.адрес интернет-магазина, осуществляющий свою деятельность посредством Интернет-ресурса и сопутствующих ему сервисов. </p>
							<p>2.1.2. Интернет-магазин – сайт, содержащий информацию о Товарах, Продавце, позволяющий осуществить выбор, заказ и (или) приобретение Товара. </p>
							<p>2.1.3. Администрация сайта Интернет-магазина – уполномоченные сотрудники на управления Сайтом, действующие от имени название организации.</p>
							<p>2.1.4. Пользователь сайта Интернет-магазина (далее   Пользователь) – лицо, имеющее доступ к Сайту, посредством сети Интернет и использующее Сайт. </p>
						</div>
					</div>
					<div className="step_block_cell">
						<div className="icon_graph left_pos agree_list_icon mobile-none"></div>
						<div className="description_txt_block after_icon_desc">
							<p className="big_header_paraq">Коротко говоря</p>
							<p>Пользуясь сайтом вы обязуетесь <br />
								свовременно посещать приемы у своего <br />
								специалиста, не создавать приемы, <br />
								на которых не сможете появиться.</p>
						</div>
					</div>
				</section>
				<section className="info_section_block more_bot_pad">
					<div className="icon_graph left_pos question_icon"></div>
					<div className="description_txt_block note_left_pad">
						<div>
							<span>Остались вопросы?</span> <Link to="/feedback">Напишите нам</Link>
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