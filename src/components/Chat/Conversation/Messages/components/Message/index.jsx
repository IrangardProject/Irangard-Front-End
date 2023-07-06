import format from 'date-fns/format';
import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';

// import { MessageTypes } from 'src/store/types';

import './styles.scss';



function Message(props) {
  console.log('props.is_server',props.is_server);
  const sanitizedHTML = markdownIt({ break: true })
    .use(markdownItClass, {
      img: ['rcw-message-img']
    })
    .use(markdownItSup)
    .use(markdownItSanitizer)
    .use(markdownItLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } })
    .render(props.message.message);

  return (
    <div className={`rcw-${props.message.sender}`}>
      <div className={`rcw-message-text ${props.is_server ? 'rcw-message-cont' : 'rcw-message-cont-server'}`} dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/,'') }} />
      {/* {props.showTimeStamp && <span className="rcw-timestamp">{format(props.message.timestamp, 'hh:mm')}</span>} */}
    </div>
  );
}

export default Message;
