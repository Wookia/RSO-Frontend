import React from 'react';
import '../App.css'
import { TestButtons } from './testButtons';
import { Users } from './users'
import { Orders } from './orders'
import { Reservations } from './reservations'

const breadcrumbs = 
[
    {name: 'Orders'},
    {name: 'Reservations'},
    {name: 'Users'},
    {name: 'Test'}
];

export class Tabs extends React.Component {
    initialState = {selectedTab: 0};

    constructor(props) {
        super(props);
        this.renderBody = this.renderBody.bind(this);
        this.setSelectedTab = this.setSelectedTab.bind(this);
        this.state = this.initialState;
    }

    setSelectedTab(e, index) {
        e.preventDefault();
        this.setState({selectedTab: index});
    }

    renderBody() {
        switch(this.state.selectedTab) {
            case 0:
                return <Orders />;
            case 1:
                return <Reservations />;
            case 2:
                return <Users token={this.props.user.token}/>;
            case 3:
                return <TestButtons token={this.props.user.token} isLoggedIn={this.props.user.loggedIn}/>
            default:
                return null;
        }
    }

    render() {
        if (!this.props.user.loggedIn) {
            return (null);
        }
        else {
            return (
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            {breadcrumbs.map((item, index) => {
                                return (
                                    index !== this.state.selectedTab ? 
                                    <li key={item.name} className={'breadcrumb-item'}>
                                        <a href="" onClick={(e) => this.setSelectedTab(e, index)}>
                                            {item.name}
                                        </a>
                                    </li>
                                    :
                                    <li key={item.name} className={'breadcrumb-item' + (index === this.state.selectedTab ? ' active' : '')}>
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
}