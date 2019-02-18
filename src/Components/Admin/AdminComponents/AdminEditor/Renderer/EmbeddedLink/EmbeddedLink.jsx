import React, {Component} from 'react';
const getVideoId = require('get-video-id');

class EmbeddedLink extends Component {
    render() {
        const { block, contentState } = this.props;    
        const entity = contentState.getEntity(block.getEntityAt(0));
        const { src, height, width } = entity.getData();
        const video = getVideoId(src);
        let embedSrc;
        if(video.service === "youtube") {
            embedSrc = `https://www.youtube.com/embed/${video.id}`;
        }
        if(video.service === "vimeo") {
            embedSrc = `https://player.vimeo.com/video/${video.id}`;
        }
        return (<iframe height={height} width={width} src={embedSrc} frameBorder="0" allowFullScreen title="Wysiwyg Embedded Content" />);
    }
};

export default EmbeddedLink;