import ReactOnRails from 'react-on-rails';
import OverviewApp from './overview/startup/overview-app-client';
import NewPollApp from './new-poll/startup/new-poll-app-client';
import PollAdminApp from './poll-admin/startup/poll-admin-app-client';
import TakePollApp from './take-poll/startup/take-poll-app-client';

ReactOnRails.register({ OverviewApp });
ReactOnRails.register({ NewPollApp });
ReactOnRails.register({ PollAdminApp });
ReactOnRails.register({ TakePollApp });
