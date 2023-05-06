import React, { ReactElement, FunctionComponent } from 'react';
import * as cheerio from 'cheerio';
import { v4 as uuidv4 } from 'uuid';
import {
  Header1,
  Header2,
  Header3,
  Header4,
  Header5,
  Header6,
  Paragraph,
  List,
  OrderedList,
  ImageContainer,
  Caption,
} from 'components/content';

import { preHTMLClear, cleanFromTags, cleanText, cleanSrc } from './helpers';

const retrieveComponentsFromChildren = (children) => {
  const components = children.reduce((acc, el, index) => {
    if (!el) return acc;

    const finalIndex = `${uuidv4()}-${index}`;

    switch (el.type) {
      case 'text': {
        const { data } = el;
        const text = cleanText(data);

        if (!text) break;

        acc.push(<Paragraph key={finalIndex}>{text}</Paragraph>);
        break;
      }

      case 'tag': {
        switch (el.name) {
          case 'img': {
            const { src } = el.attribs;

            const finalSrc = cleanSrc(src);

            if (!finalSrc) break;

            acc.push(<ImageContainer src={finalSrc} key={finalIndex} />);
            break;
          }

          case 'p': {
            const text = cleanFromTags(el);

            if (!text) break;

            acc.push(<Paragraph key={finalIndex}>{text}</Paragraph>);
            break;
          }

          case 'figcaption': {
            const text = cleanFromTags(el);

            if (!text) break;

            acc.push(<Caption key={finalIndex}>{text}</Caption>);
            break;
          }

          case 'blockquote': {
            const text = cleanFromTags(el);

            if (!text) break;

            acc.push(
              <Paragraph key={finalIndex} italic>
                {text}
              </Paragraph>,
            );
            break;
          }

          case 'div':
          case 'figure': {
            acc.push(...retrieveComponentsFromChildren(el.children));

            break;
          }

          case 'h1': {
            const text = cleanFromTags(el);

            if (!text) break;
            acc.push(<Header1 key={finalIndex}>{text}</Header1>);

            break;
          }

          case 'h2': {
            const text = cleanFromTags(el);

            if (!text) break;

            acc.push(<Header2 key={finalIndex}>{text}</Header2>);
            break;
          }

          case 'h3': {
            const text = cleanFromTags(el);

            if (!text) break;

            acc.push(<Header3 key={index}>{text}</Header3>);
            break;
          }

          case 'h4': {
            const text = cleanFromTags(el);

            if (!text) break;

            acc.push(<Header4 key={finalIndex}>{text}</Header4>);
            break;
          }

          case 'h5': {
            const text = cleanFromTags(el);

            if (!text) break;

            acc.push(<Header5 key={finalIndex}>{text}</Header5>);
            break;
          }

          case 'h6': {
            const text = cleanFromTags(el);

            if (!text) break;

            acc.push(<Header6 key={finalIndex}>{text}</Header6>);
            break;
          }

          case 'ul': {
            const lis = el.children;

            const lisTexts = lis
              .map((li) => cleanFromTags(li))
              .filter((text) => !!text);

            if (!lisTexts.length) break;

            acc.push(<List key={finalIndex} items={lisTexts} />);
            break;
          }

          case 'ol': {
            const lis = el.children;

            const lisTexts = lis
              .map((li) => cleanFromTags(li))
              .filter((text) => !!text);

            if (!lisTexts.length) break;

            acc.push(<OrderedList key={finalIndex} items={lisTexts} />);
            break;
          }

          default:
            break;
        }
      }
    }

    return acc;
  }, []);

  return components;
};

type HtmlParserProps = {
  html: string;
};

export const HtmlParser = (props: HtmlParserProps): ReactElement => {
  const { html } = props;

  const initialHTML = preHTMLClear(html);

  const $ = cheerio.load(initialHTML);

  const body = $('body')[0];

  if (!body || !body.children || !body.children.length) return <></>;

  body.children[0].type;

  const components: ReactElement = retrieveComponentsFromChildren(
    body.children,
  );

  return components;
};
