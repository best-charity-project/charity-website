import React, { Component } from 'react';
import AdminLibraryItem from '../AdminLibraryItem/AdminLibraryItem';
import { server } from '../../../../api';
import { withRouter } from "react-router-dom";
import axios from 'axios';

class AdminLibraryList extends Component {

    getMaterial = (id) => {
        axios({
            url: `${server}/api/materials/${id}`
        })
            .then(res => {
                this.props.history.push({
                    pathname: '/admin-panel/library/create',
                    state: { material: res.data.material }
                })
            })
    }

    render() {
        return (
            <div className="news-list-admin">
                <div className="news-list-header">
                    <div>Название</div>
                    <div>Источник</div>
                    <div>Категория</div>
                    <div>Методика</div>
                    <div>Удалить материал</div>
                </div>
                <div>
                    {this.props.materials.map(item =>
                        <AdminLibraryItem
                            material={item}
                            key={item._id}
                            deleteHandler={() => this.props.deleteMaterial(item)}
                            showMaterial={() => this.getMaterial(item._id)}
                            checkId={this.props.checkId}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default withRouter(AdminLibraryList);
