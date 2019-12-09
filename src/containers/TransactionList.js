import React, { Component } from 'react';
import './TransactionList.css';
import Transaction from '../components/Transaction';


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
        const response = await fetch("https://nextar.flip.id/frontend-test")

        if (response) {
            const json = await response.json();
            var result = Object.keys(json).map(function (key) {
                return [json[key]];
            });
            this.setState({ transactions: result });
        }


    }

    renderTransaction = () => {
        const { transactions, searchText } = this.state;
        if (transactions.length > 0) {
            let filtered = transactions;
            if (searchText.length > 0) {
                filtered = transactions.filter((item) => item[0].beneficiary_name.toLowerCase().search(searchText.toLowerCase()) > -1)
            }

            if (filtered.length > 0) {
                return filtered.map((item) => {
                    console.log(item[0])
                    return <Transaction item={item[0]} />
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
                    <i class="search-icon fas fa-search"></i>
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