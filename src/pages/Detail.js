import React from 'react';
import { IndexLink, Link } from 'react-router';
import agent from 'superagent';

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'commits',
            commits: [],
            forks: [],
            pulls:[]
        };
    }

    componentWillMount() {
        this.fetchFeed('commits');
        this.fetchFeed('forks');
        this.fetchFeed('pulls');
    }

    componentWillReceiveProps(newProps) { this.fetchAll(); }

    fetchFeed(type) {
        console.log(`fetching feed for ${type}`);
        if (this.props.params.repo === '') { return; }
        const baseURL = 'https://api.github.com/repos/facebook';
        agent.get(`${baseURL}/${this.props.params.repo}/${type}`)
            .end((error, response) => {
                if (!error && response) { this.saveFeed(type, response.body); }
                else { console.log(`Error fetching ${type}`, error); }
            }
        );
    }

    fetchAll() {
        this.fetchFeed('commits');
        this.fetchFeed('pulls');
        this.fetchFeed('forks');
    }

    saveFeed(type, contents) { this.setState({ [type]: contents }); }

    selectMode(mode) { this.setState({ mode: mode }); }

    renderCommits() {
        return this.state.commits.map((commit, index) => {
            const author = commit.author ? commit.author.login : 'Anonymous';

            return (
                <p key={index}>
                    <strong><Link to={`/user/${author}`}>{author}</Link></strong>:
                    <a href={commit.html_url}>{commit.commit.message}</a>.
                </p>
            );
        });
    }

    renderPulls() {
        return this.state.pulls.map((pull, index) => {
            const author = pull.user ? pull.user.login : 'Anonymous';

            return (
                <p key={index}>
                    <strong><Link to={`/user/${author}`}>{author}</Link></strong>:
                    <a href={pull.html_url}>{pull.body}</a>.
                </p>
            );
        });
    }

    renderForks() {
        return this.state.forks.map((fork, index) => {
            const author = fork.owner ? fork.owner.login : 'Anonymous';

            return (
                <p key={index}>
                    <strong><Link to={`/user/${author}`}>{author}</Link></strong> forked to:
                    <a href={fork.html_url}>{fork.html_url}</a> at {fork.created_at}.
                </p>
            );
        });
    }

    render() {
        let content;

        if (this.state.mode === 'pulls') {
            content = this.renderPulls();
        } else if (this.state.mode === 'forks') {
            content = this.renderForks();
        } else {
            content = this.renderCommits();
        }

        return (
             <div>
             <p>You are here: {this.props.params.repo}</p>
                <ul><strong>Menu:</strong>
                    <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                    <li><Link to="/detail/react">React</Link></li>
                    <li><Link to="/detail/react-native">React Native</Link></li>
                    <li><Link to="/detail/jest">Jest</Link></li>
                </ul>
                <button onClick={this.selectMode.bind(this, 'commits')}>Show Commits</button>
                <button onClick={this.selectMode.bind(this, 'forks')}>Show Forks</button>
                <button onClick={this.selectMode.bind(this, 'pulls')}>Show Pulls</button>
                {content}
            </div>
        );
    }
}

Detail.propTypes = { params: React.PropTypes.object, };

export default Detail;

