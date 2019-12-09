import React, { Component } from 'react';
import './TransactionList.css';
import Transaction from '../components/Transaction';

//karena kendala cors maka data transaksi disimpan di list.js
import { transactionsData } from '../list.js'



class TransactionList extends Component {
    state = {
        searchText: "",
        transactions: [],
        renderedTransactions: []
    }

    onChangeSearch = (e) => {
        this.setState({ searchText: e.target.value })
    }


    async componentDidMount() {
        let result = [];
        const response = await fetch("https://nextar.flip.id/frontend-test")
            .catch(() => {
                result = Object.keys(transactionsData).map(function (key) {
                    return [transactionsData[key]];
                });
            })

        if (response) {
            const json = await response.json();
            result = Object.keys(json).map(function (key) {
                return [json[key]];
            });
        }

        this.setState({ transactions: result });
    }

    renderTransaction = () => {
        const { transactions, searchText } = this.state;
        if (transactions.length > 0) {
            let filtered = transactions;
            if (searchText.length > 0) {
                filtered = transactions.filter((item) => item[0].beneficiary_name.toLowerCase().search(searchText.toLowerCase()) > -1)
            }

            if (filtered.length > 0) {
                return filtered.map((item, i) => {
                    return <Transaction item={item[0]} key={i} />
                })
            } else {
                return <p style={{ textAlign: "center", margin: "24px" }}>Transaksi tidak ditemukan</p>
            }
        } else {
            return <p style={{ textAlign: "center", margin: "24px" }}>Gagal mengambil data transaksi (karena kendala CORS)</p>
        }
    }

    render() {
        const { searchText } = this.state;
        return (
            <div>
                <div className="container-search">
                    <i className="search-icon fas fa-search"></i>
                    <input
                        placeholder={"Cari nama"}
                        value={searchText}
                        onChange={this.onChangeSearch} />
                </div>
                <div>{this.renderTransaction()}</div>
            </div>
        )
    }
}

export default TransactionList