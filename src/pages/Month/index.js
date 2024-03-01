import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DayBill from './components/DayBill'

const Month = () => {
    //按月做数据分组
    const billList = useSelector(state => state.bill.billList)
    //按月分组
    const monthGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    }, [billList])

    //控制日期弹框的显示隐藏
    const [dateVisible, setDateVisible] = useState(false)

    // 控制时间显示
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs(new Date()).format('YYYY-MM')
    })
    const [currentMonthList, setCurrentMonthList] = useState([])
    const monthResult = useMemo(() => {
        const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, b) => a + b.money, 0)
        const income = currentMonthList.filter(item => item.type === 'income').reduce((a, b) => a + b.money, 0)
        return {
            pay,
            income,
            total: pay + income
        }
    }, [currentMonthList])

    //初始渲染账单数据
    useEffect(() => {
        const nowDate = dayjs().format('YYYY-MM')
        if (monthGroup[nowDate]) {
            setCurrentMonthList(monthGroup[nowDate])
        }
    }, [monthGroup])

    //日期弹框的确认事件
    const onConfirm = (date) => {
        setDateVisible(false)
        const formatDate = dayjs(date).format('YYYY-MM')
        setCurrentMonthList(monthGroup[formatDate] || [])
        setCurrentDate(formatDate)
    }

    //按日分组
    const dayGroup = useMemo(() => {
        const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(groupData)
        return {
            groupData,
            keys
        }
    }, [currentMonthList])
    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text">
                            {currentDate + ''}月账单
                        </span>
                        {/*箭头控制,根据类名控制箭头朝向*/}
                        <span className={classNames('arrow', dateVisible && 'expand')}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        max={new Date()}
                        onCancel={() => setDateVisible(false)}
                        onConfirm={onConfirm}
                        onClose={() => setDateVisible(false)}
                    />
                </div>
                {/*单日列表统计*/}
                {
                    dayGroup.keys.map(day => {
                        console.log(dayGroup.groupData[day])
                        return <DayBill key={day} date={day} billList={dayGroup.groupData[day]} />
                    })
                }

            </div>
        </div>
    )
}

export default Month