import React from 'react';
import agent from 'superagent';

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = { commits: [] };
    }

    componentWillMount() {
        agent.get('https://api.github.com/repos/facebook/react/commits')
            .end((error, response) => {
                if (!error && response) {
                    console.dir(response.body);
                    this.setState({ commits: response.body });
                } else {
                    console.log('There was an error fetching from GitHub', error);
                }
            }
        );
    }

    render() {
        return (
            <div>
            {this.state.commits.map((commit, index) => {
                const author = commit.author ? commit.author.login : 'Anonymous',
                    url = commit.html_url ? commit.html_url : '',
                    message = commit.commit.message ? commit.commit.message : 'None';

                return (
                     <p key={index}>
                         <strong>{author}</strong>:
                         <a href={url}>{message}</a>
                     </p>
                );
            })}
            </div>
        );
    }
}

export default Detail;
