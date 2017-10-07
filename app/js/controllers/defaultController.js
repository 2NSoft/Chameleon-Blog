/* globals $ */

import { load as loadTemplate } from 'templates';
import { registerList } from 'listHelper';
import data from 'data';

const $footer = $('footer');

export function get() {
    return registerList()
        .then( () => {
            return data.getFooterData();
        })
        .then( ([
            recentPosts,
            textWidgetData,
            recentComments,
            ]) => {
            return loadTemplate( 'footer', {
                posts: {
                    items: recentPosts,
                    type: 'Recent Posts',
                },
                text: {
                    text: textWidgetData[0].text,
                    _id: textWidgetData[0]._id,
                    type: 'Text Widget',
                    skipList: true,
                },
                comments: {
                    items: recentComments,
                    type: 'Recent Comments',
                },
            } );
        })
        .then( ( footerTemplate ) => {
            const footerHTML = $footer.html();
            $footer.html(footerTemplate + footerHTML);
        });
}
