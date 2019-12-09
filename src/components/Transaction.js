import React, { Component } from 'react';
import './Transaction.css';
import moment from 'moment-mini';


class Transaction extends Component {

    formatTextBank = (bank) => {
        let newText = bank;
        if (bank.length < 5) {
            newText = bank.toUpperCase()
        } else {
            newText = bank.charAt(0).toUpperCase() +
                bank.slice(1);
        }
        return newText
    }

    render() {
        const { item } = this.props;
        return (
            <div className='container-item'>
                <div>
                    <div>
                        {item.status === "SUCCESS" ? <div className="left-border success"></div> :
                            item.status === "PENDING" ?
                                <div className="left-border pending"></div> :
                                <div className="left-border error"></div>}
                    </div>
                </div>
                <div className="container-text">
                    <div>
                        <h1>{`${this.formatTextBank(item.sender_bank)}`} < i className="fas fa-arrow-right"></i>{` ${this.formatTextBank(item.beneficiary_bank)}`}</h1>
                        <p>{item.beneficiary_name}</p>
                        <p>{`Rp${item.amount.toLocaleString().replace(/,/g, '.')} `}
                            <i className="fas fa-circle" style={{ fontSize: "8px" }}></i>
                            {` ${moment(item.completed_at.split(" ")[0]).format("DD MMMM YYYY")}`}</p>
                    </div>
                    <div>
                        {item.status === "SUCCESS" ? <div className="text-status success">Berhasil</div> :
                            item.status === "PENDING" ?
                                <div className="text-status pending">Menunggu</div> :
                                <div className="text-status error">Gagal</div>}
                    </div>
                </div>


            </div >
        )
    }
}

export default Transaction