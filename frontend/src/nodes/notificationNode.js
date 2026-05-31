import { useState } from 'react';
import { BaseNode } from './BaseNode';

const CHANNELS = ['Email', 'SMS', 'Push', 'Slack', 'Webhook'];

export const NotificationNode = ({ id, data }) => {
  const [channel, setChannel] = useState(data?.channel || 'Email');
  const [message, setMessage] = useState(data?.message || '');

  return (
    <BaseNode
      title="Notification"
      variant="sink"
      inputs={[{ id: `${id}-message` }]}
      outputs={[{ id: `${id}-sent` }]}
    >
      <label className="workflow-field">
        Channel
        <select value={channel} onChange={(e) => setChannel(e.target.value)}>
          {CHANNELS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label className="workflow-field">
        Message
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Notification text"
        />
      </label>
    </BaseNode>
  );
};
