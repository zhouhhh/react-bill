import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState } from 'react'
import classNames from 'classnames'

const Month = () => {
    const [dateVisible, setDateVisible] = useState(false)

    const onConfirm = () => {
        setDateVisible(false)
    }
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
                            2023 | 3月账单
                        </span>
                        {/*箭头控制,根据类名控制箭头朝向*/}
                        <span className={classNames('arrow', dateVisible && 'expand')}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">100</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">200</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">50</span>
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
                    // dayGroup.keys.map(day => {
                    //     console.log(dayGroup.groupData[day])
                    //     return <DayBill key={day} date={day} billList={dayGroup.groupData[day]} />
                    // })
                }

            </div>
        </div>
    )
}

export default Month