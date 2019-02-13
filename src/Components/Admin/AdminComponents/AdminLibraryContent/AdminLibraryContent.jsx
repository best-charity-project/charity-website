import React, { Component } from 'react';
import AdminLibraryList from '../AdminLibraryList/AdminLibraryList';
import AdminNewsSearch from '../AdminNewsSearch/AdminNewsSearch';
import Button from '../../../Button/Button';
import { server } from '../../../../api';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import rubbishImg from '../../../../Assets/AssetsSvg/mbri-trash.svg';

class AdminLibraryContent extends Component {
    state = {
        data: [],
        filteredData: [],
        isLoading: true,
        error: null,
        checkedIds: []
    }
    componentDidMount() {
        axios({
            url: `${server}/api/materials`,
            method: 'get',
            mode: 'cors'
        })
            .then(res => this.setState({ data: res.data.materials, filteredData: res.data.materials, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }))
    }

    checkId = (id) => {
        let tempId = this.state.checkedIds;
        if (~this.state.checkedIds.indexOf(id)) {
            tempId.splice(tempId.indexOf(id), 1)
        } else {
            tempId.push(id)
        }
        this.setState({ checkedIds: tempId })
    }

    submit = () => {
        confirmAlert({
            title: 'Подтвердите удаление материалов',
            message: 'Вы точно хотите удалить ' + this.state.checkedIds.length + ' материал(ов)?',
            buttons: [
                {
                    label: 'Да',
                    onClick: (item) => this.deleteMaterials(item)
                },
                {
                    label: 'Нет',
                    onClick: () => { }
                }
            ]
        })
    }
    deleteMaterials = (item) => {
        axios({
            method: 'delete',
            url: `${server}/api/materials`,
            data: { 'idsToDelete': item ? [item._id] : this.state.checkedIds },
            config: {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        })
            .then((result) => {
                this.setState({
                    filteredData: this.state.filteredData.filter(item => result.data.deletedIds.indexOf(item._id) < 0),
                    checkedIds: []
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    search = (string) => {
        const { data } = this.state;

        this.setState({
            filteredData: data.filter(item => item.title.toLowerCase().includes(string))
        })
    };

    render() {
        const { isLoading, error } = this.state;

        if (isLoading) {
            return <p>Loading ...</p>
        }
        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            <div className="admin-position-content">
                <div className="new-news">
                    <AdminNewsSearch findNews={this.search} />
                    <div className="button-new-news">
                        <Route render={({ history }) => (
                            <Button
                                name="button-admin"
                                label="Создать"
                                clickHandler={() => history.push('/admin-panel/library/create')}
                            />
                        )} />
                    </div>
                </div>
                <Button
                    name="delete-news"
                    clickHandler={this.submit}
                    disabled={this.state.checkedIds.length ? false : true}
                    label={<div>
                        <img src={rubbishImg} alt='' />
                        <span>Удалить</span>
                    </div>}
                />
                <AdminLibraryList
                    materials={this.state.filteredData}
                    loading={this.state.isLoading}
                    deleteMaterial={this.deleteMaterials}
                    checkId={this.checkId}
                />
            </div>
        )
    }
}

export default AdminLibraryContent;