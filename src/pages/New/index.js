import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { addBillList } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'
import dayjs from "dayjs";

const New = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // 1.准备一个状态来管理收入和支出 pay--支出  income--收入
    const [billType, setBillType] = useState('pay')
    // 账单类型
    const [useFor, setUseFor] = useState('')

    const [money, setMoney] = useState(0)
    const moneyChange = (value) => {
        setMoney(value)
    }
    //存储选择的时间
    const [date, setDate] = useState()
    // 控制时间打开关闭
    const [dateVisible, setDateVisible] = useState(false)
    const dateConfirm = (value) => {
        setDate(value)
        setDateVisible(false)
    };
    //保存
    const saveBill = () => {
        const data = {
            type: billType,
            money: billType === 'pay' ? -money : +money,
            date: new Date(),
            useFor
        }
        dispatch(addBillList(data))
    }
    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        onClick={() => setBillType('pay')}
                        shape="rounded"
                        className={classNames(billType === 'pay' ? 'selected' : '')}
                    >
                        支出
                    </Button>
                    <Button
                        onClick={() => setBillType('income')}
                        className={classNames(billType === 'income' ? 'selected' : '')}
                        shape="rounded"
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type="calendar" className="icon" />
                            <span className="text" onClick={() => setDateVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
                            {/*时间选择期*/}
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={dateVisible}
                                onConfirm={dateConfirm}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={moneyChange}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {/*数据区域*/}
                {billListData[billType].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames(
                                                'item',
                                                useFor === item.type ? 'selected' : ''
                                            )}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={() => saveBill()}>
                    保 存
                </Button>
            </div>
        </div>
    )

}
export default New