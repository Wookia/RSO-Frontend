import React from 'react';
import '../App.css'
import { Users } from './users'
import { Orders } from './orders'
import { Tables } from './tables'
import { Reservations } from './reservations'
import { AddReservation } from './addReservation'
import { getAllTables, getAllTablesNoToken, getMenuItemsNoToken } from '../dockerTest'
import { MenuItems } from './menuItems';
import { Register } from './register';

const breadcrumbs =
    [
        { id: 0, name: 'Add reservation', roles: [0, 1, 2, 3] },
        { id: 1, name: 'Orders', roles: [1, 2, 3] },
        { id: 2, name: 'Reservations', roles: [2, 3] },
        { id: 3, name: 'Menu', roles: [0, 1, 2, 3], showToAnonymous: true },
        { id: 4, name: 'Tables', roles: [2, 3], showToAnonymous: true },
        { id: 5, name: 'Users', roles: [3] },
        { id: 6, name: 'Register', roles: [] }
    ];

export class Tabs extends React.Component {
    initialState = { selectedTab: 0,
        menuItems: { data: [], isLoading: false, error: null },
        tables: { data: [], isLoading: false, error: null },
        breadcrumbsFiltered: []
     };

    constructor(props) {
        super(props);
        this.renderBody = this.renderBody.bind(this);
        this.setSelectedTabClick = this.setSelectedTabClick.bind(this);
        this.setSelectedTab = this.setSelectedTab.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.state = this.initialState;
    }

    componentDidMount() {
        this.setState({ tables: { data: [], isLoading: true }, menuItems: { data: [], isLoading: true } });

        this.fetchData();
    }

    fetchData() {
        if (this.props.user.loggedIn) {
            getAllTables(this.props.user.token)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ tables: { data, isLoading: false } }))
            .catch(error => this.setState({ tables: { data: [], error, isLoading: false } }));
        }
        else {
            getAllTablesNoToken()
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ tables: { data, isLoading: false } }))
            .catch(error => this.setState({ tables: { data: [], error, isLoading: false } }));
        }

        getMenuItemsNoToken()
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ menuItems: { data, isLoading: false } }))
            .catch(error => this.setState({ menuItems: { data: [], error, isLoading: false } }));
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
                return <AddReservation user={this.props.user} tables={this.state.tables} />;
            case 1:
                return <Orders user={this.props.user} tables={this.state.tables} menuItems={this.state.menuItems.data} />;
            case 2:
                return <Reservations user={this.props.user} />
            case 3:
                return <MenuItems items={this.state.menuItems.data} />;
            case 4:
                return <Tables tables={this.state.tables} />;
            case 5:
                return <Users token={this.props.user.token} />;
            case 6:
                return <Register />
            default:
                return null;
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user.loggedIn !== prevProps.user.loggedIn) {
            this.fetchData(); // refresh data on login / logout
        }
    }

    static getDerivedStateFromProps(props, state) {
        var updatedState = {breadcrumbsFiltered: []}
        updatedState.breadcrumbsFiltered = breadcrumbs.filter((crumb) => crumb.roles.includes(props.user.role) || crumb.showToAnonymous);
        if (!props.user.loggedIn) {
            updatedState.breadcrumbsFiltered.push(breadcrumbs[6]);
        }
        // after login / logout selectedTable persists in state
        if (!updatedState.breadcrumbsFiltered.some(elem => elem.id === state.selectedTab)) {
            updatedState.selectedTab = updatedState.breadcrumbsFiltered[0].id;
        }
        return updatedState;
    }

    render() {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {this.state.breadcrumbsFiltered.map((item, index) => {
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