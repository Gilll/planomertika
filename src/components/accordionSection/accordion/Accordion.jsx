import React from "react";
import { Collapse } from 'antd';




const Accordion = () => {
const { Panel } = Collapse;


    return (
        <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header="Зачем нужен проект перепланировки квартиры?" key="1">
				Это требование ст. 26 Жилищного кодекса РФ. Подготовленный и оформленный в установленном порядке проект переустройства и (или) перепланировки переустраиваемого и (или) перепланируемого помещения в многоквартирном доме нужен для согласования перепланировки. Без проектной документации надзорные органы не дадут разрешение.
            </Panel>
            <Panel header="Какие сейчас тренды в перепланировке?" key="2">
				<p>•	Оборудовать кухни и столовые</p>
				<p>Многим в наследство от советской эпохи достались маленькие неудобные кухни. Они едва пригодны для жизни двух человек. Вам нужна хорошая кухня-столовая, в которой будет достаточно места для всей семьи или даже группы гостей.
				</p>
				<p>•	Добавление лоджий</p>
				<p>				Для того чтобы полностью объединить комнату и лоджию, иногда приходится соблюдать различные правила. Например, если вы находитесь на высоте более 15 м над уровнем земли, имеете только одну лоджию и только одну лестницу на этаж или отделение, противопожарные нормы запрещают полностью интегрировать лоджию в качестве аварийного выхода в случае пожара.
				</p>
				<p>•	Расширение ванной комнаты</p>
				<p>				Многие хотят иметь в ванной комнате ванну большего размера, отдельный душ или туалет, а также стиральную машину или сушилку.
				</p>
            </Panel>
            <Panel header="Что же делать, если хочется увеличить площадь комнаты?" key="3">
				<p>На помощь приходят подсобные помещения. Во многих наших проектах мы расширяли пространство за счет площади коридора, а иногда даже создавали дополнительную комнату, сделав вынос кухни в коридор.
				</p>
				<p>Лоджия и балкон. Для начала нужно выяснить являетесь ли вы обладателем лоджии и не нарушаете ли вы закон «об изменении фасада», внося изменения. Эти данные можно запросить у управляющей компании. Если вам дали зеленый свет, то лоджия может стать отдельной комнатой, зоной отдыха или рабочим кабинетом, или наоборот, можно снести подоконный блок (дверь и окно), перенести обогреватель (убирать его совсем нельзя), и увеличить таким образом площадь помещения.
				</p>
            </Panel>
            <Panel header="Как узаконить планировку ?" key="4">
				<p>Самый простой способ изначально сделать планировочное решение квартиры с соблюдением всех норм и правил.</p>
				<p>Очевидно, что сделать это самостоятельно достаточно сложно, и лучше доверить эту работу дизайнеру интерьера.</p>
            </Panel>
        </Collapse>

    );

};


export default Accordion;

