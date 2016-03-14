import React from 'react';
import { Link } from 'react-router';
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

    fetchFeed(type) {
        const baseURL = 'https://api.github.com/repos/facebook';
        agent.get(`${baseURL}/${this.props.params.repo}/${type}`)
            .end((error, response) => {
                if (!error && response) { this.setState({ [type]: response.body }); }
                else { console.log(`Error fetching ${type}`, error); }
            }
        );
    }

    selectMode(mode) { this.setState({ mode: mode }); }

    renderCommits() {
        return this.state.commits.map((commit, index) => {
            const author = commit.author ? commit.author.login : 'Anonymous';

            return (
                <p key={index}>
                    <strong>{author}</strong>:
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
                    <strong>{author}</strong>
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
                    <strong>{author}</strong>: forked to
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
                <p>Please choose a repository from the list below.</p>
                <ul>
                    <li><Link to="/">List</Link></li>
                </ul>
                <button onClick={this.selectMode.bind(this, 'commits')}>Show Commits</button>
                <button onClick={this.selectMode.bind(this, 'forks')}>Show Forks</button>
                <button onClick={this.selectMode.bind(this, 'pulls')}>Show Pulls</button>
                {content}
            </div>
        );
    }
}

export default Detail;
