import React from 'react';
import { Link } from 'react-router';
import agent from 'superagent';

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        };
    }

    componentWillMount() {
        const baseURL = 'https://api.github.com/users';
        agent.get(`${baseURL}/${this.props.params.user}/events`)
            .end((error, response) => {
                if (!error && response) { this.setState({ events: response.body }); }
                else { console.log('Error fetching data', error); }
            }
        );
    }

    renderUserFeed() {
        return this.state.events.map((event, index) => {
            const eventType = event.type,
                repoName = event.repo.name,
                creationDate = event.created_at;

            return (
                <li key={index}>
                    <strong>{repoName}</strong>: {eventType} at {creationDate}
                </li>
            );
        })
    }

    render() {
        let content = this.renderUserFeed();
        return (
            <div>
                <ul>
                    <li><Link to="/">List</Link></li>
                    <li><Link to="/detail/react">React</Link></li>
                    <li><Link to="/detail/react-native">React Native</Link></li>
                    <li><Link to="/detail/jest">Jest</Link></li>
                </ul>
                <ul>
                    {content}
                </ul>
            </div>
        );
    }
}

User.propTypes = { params: React.PropTypes.object, };

export default User;

