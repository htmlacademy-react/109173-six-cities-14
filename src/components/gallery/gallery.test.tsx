import { render, screen } from '@testing-library/react';
import Gallery from './gallery';

describe('[Component ]:', () => {
  it('Should render correct if not passed any images', () => {
    const images: [] = [];
    const galleryElem = 'galleryElem';
    const component = <Gallery images={ images }/>;

    render(component);
    const expectElem = screen.getByTestId(galleryElem);

    expect(expectElem).toBeInTheDocument();
  });

  it('Should render correct if images are passed', () => {
    const images: string[] = ['img/one', 'img/two'];
    const imgAltText = 'Photo studio';
    const component = <Gallery images={ images }/>;

    render(component);
    const expectedImgCount = 2;
    const expectElem = screen.getAllByAltText(imgAltText);

    expect(expectElem.length).toBe(expectedImgCount);
  });
});
