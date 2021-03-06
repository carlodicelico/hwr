import React from 'react';
import { IndexLink, Link } from 'react-router';

class List extends React.Component {
    render() {
        return (
            <div>
             <p>You are here: {this.props.params.repo}</p>
                <ul><strong>Menu:</strong>
                    <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                    <li><Link to="/detail/react" activeClassName="active">React</Link></li>
                    <li><Link to="/detail/react-native" activeClassName="active">React Native</Link></li>
                    <li><Link to="/detail/jest" activeClassName="active">Jest</Link></li>
                </ul>
            </div>
        );
    }
}

export default List;

