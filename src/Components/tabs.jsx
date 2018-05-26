import React from 'react';
import '../App.css'
import { TestButtons } from './testButtons';
import { Users } from './users'
import { Orders } from './orders'
import { Reservations } from './reservations'
import { AddReservation } from './addReservation'

const breadcrumbs =
    [
        { id: 0, name: 'Reservations', roles: [0,1,2,3] },
        { id: 1, name: 'Orders', roles: [1,2,3] },
        { id: 2, name: 'Reservations', roles: [1,2,3] },
        { id: 3, name: 'Users', roles: [3] },
        { id: 4, name: 'Test', roles: [0,1,2,3] }
    ];

export class Tabs extends React.Component {
    initialState = { selectedTab: 0 };

    constructor(props) {
        super(props);
        this.renderBody = this.renderBody.bind(this);
        this.setSelectedTabClick = this.setSelectedTabClick.bind(this);
        this.setSelectedTab = this.setSelectedTab.bind(this);
        this.state = this.initialState;
    }

    setSelectedTabClick(e, index) {
        e.preventDefault();
        this.setSelectedTab(index);
    }

    setSelectedTab(index) {
        this.setState({ selectedTab: index });
    }

    renderBody() {
        switch (this.state.selectedTab) {
            case 0:
                return <AddReservation />;
            case 1:
                return <Orders user={this.props.user} />;
            case 2:
                return <Reservations />;
            case 3:
                return <Users token={this.props.user.token} />;
            case 4:
                return <TestButtons token={this.props.user.token} isLoggedIn={this.props.user.loggedIn} />
            default:
                return null;
        }
    }

    render() {
        var breadcrumbsFiltered = breadcrumbs.filter((crumb) => crumb.roles.includes(this.props.user.role));
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {breadcrumbsFiltered.map((item, index) => {
                            return (
                                item.id !== this.state.selectedTab ?
                                    <li key={item.id} className={'breadcrumb-item'}>
                                        <a href="" onClick={(e) => this.setSelectedTabClick(e, item.id)}>
                                            {item.name}
                                        </a>
                                    </li>
                                    :
                                    <li key={item.id} className={'breadcrumb-item' + (item.id === this.state.selectedTab ? ' active' : '')}>
                                        {item.name}
                                    </li>
                            )
                        })}
                    </ol>
                </nav>
                <div className="container">
                    {this.renderBody()}
                </div>
            </div>
        );
    }
}