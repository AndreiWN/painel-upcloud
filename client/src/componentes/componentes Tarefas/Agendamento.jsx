import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Checkbox from "./Checkbox";

function Agendamento(props) {

    function formataAgendamentoCheckbox(string) {
        if (string && typeof string === 'string') {
            const elements = string.split('?');
            const result = [];
            for (const element of elements) {
                const [index, value] = element.split('-');
                result.push(parseInt(value) === 1)
            }
            return result;
        }
        return []
    }

    function formataStringAgendamento(array) {
        let result = '';
        for (let i = 0; i < 7; i++) {
            const value = array[i] ? 1 : 0;
            result += `${i}-${value}${i === array.length - 1 ? '' : '?'}`;
        }
        return result;
    }


    function formataAgendamentoHora(string) {
        if (string && typeof string === 'string') {
            return string.split(':')
        }
        return []
    }

    const [dadosDiasSemana, setDadosDiasSemana] = useState([])
    const [dadosHoras, setDadosHoras] = useState([])

    useEffect(() => {
        setDadosDiasSemana(formataAgendamentoCheckbox(props.dadosTarefa.agendamento_dias))
        setDadosHoras(formataAgendamentoHora(props.dadosTarefa.agendamento_hora))
    }, [props.dadosTarefa, props.dadosUsuario])

    function salvaGeral(chave, valor) {
        props.setDadosTarefa(prev => ({
            ...prev,
            [chave]: valor
        }))
    }

    function atulizaDadosDiasSemana(index) {
        const newArray = Array.from(dadosDiasSemana);
        newArray[index] = !newArray[index];
        setDadosDiasSemana(newArray);

        props.setDadosTarefa(prev => ({
            ...prev,
            agendamento_dias: formataStringAgendamento(newArray)
        }))
    }

    function atulizaHora(index, valor) {
        const newArray = Array.from(dadosHoras);
        newArray[index] = valor

        props.setDadosTarefa(prev => ({
            ...prev,
            agendamento_hora: newArray.join(":")
        }))
    }

    return (
        <div>
            <Checkbox titulo='Tipo de Agendamento' width='w-44' value={props.dadosTarefa.agendamento_tipo} onChange={e => salvaGeral('agendamento_tipo', parseInt(e.target.value))}>
                <option value={0}>Diariamente</option>
                <option value={1}>Semanalmente</option>
            </Checkbox>


            {
                props.dadosTarefa.agendamento_tipo === 1 ?
                    <div className="border p-2 w-44 border-slate-500 rounded-md ml-48 mb-3">
                        <Form.Check type="checkbox" label='Domingo' checked={dadosDiasSemana[0]} onClick={() => atulizaDadosDiasSemana(0)} />
                        <Form.Check type="checkbox" label='Segunda-feira' checked={dadosDiasSemana[1]} onClick={() => atulizaDadosDiasSemana(1)} />
                        <Form.Check type="checkbox" label='Terça-feira' checked={dadosDiasSemana[2]} onClick={() => atulizaDadosDiasSemana(2)} />
                        <Form.Check type="checkbox" label='Quarta-feira' checked={dadosDiasSemana[3]} onClick={() => atulizaDadosDiasSemana(3)} />
                        <Form.Check type="checkbox" label='Quinta-feira' checked={dadosDiasSemana[4]} onClick={() => atulizaDadosDiasSemana(4)} />
                        <Form.Check type="checkbox" label='Sexta-feira' checked={dadosDiasSemana[5]} onClick={() => atulizaDadosDiasSemana(5)} />
                        <Form.Check type="checkbox" label='Sábado' checked={dadosDiasSemana[6]} onClick={() => atulizaDadosDiasSemana(6)} />
                    </div>
                    : ''
            }


            <div className="flex">
                <Checkbox titulo='Hora' width='w-20' value={dadosHoras[0]} onChange={e => atulizaHora(0, e.target.value)}>
                    <option>00</option>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>22</option>
                    <option>23</option>
                </Checkbox>
                <span className="ml-3 mt-1">:</span>

                <Checkbox width='w-20' value={dadosHoras[1]} onChange={e => atulizaHora(1, e.target.value)} >
                    <option>00</option>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                    <option>24</option>
                    <option>25</option>
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>30</option>
                    <option>31</option>
                    <option>32</option>
                    <option>33</option>
                    <option>34</option>
                    <option>35</option>
                    <option>36</option>
                    <option>37</option>
                    <option>38</option>
                    <option>39</option>
                    <option>40</option>
                    <option>41</option>
                    <option>42</option>
                    <option>43</option>
                    <option>44</option>
                    <option>45</option>
                    <option>46</option>
                    <option>47</option>
                    <option>48</option>
                    <option>49</option>
                    <option>50</option>
                    <option>51</option>
                    <option>52</option>
                    <option>53</option>
                    <option>54</option>
                    <option>55</option>
                    <option>56</option>
                    <option>57</option>
                    <option>58</option>
                    <option>59</option>
                    <option>60</option>
                </Checkbox>
            </div>

        </div>
    )
}

export default Agendamento