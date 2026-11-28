// TEMPORARY (T-4.1, T-4.2): shows all pictograms so Sander can approve the style on his phone.
// Open with #pictos. Remove when phase 4 is done (T-4.4).
import { Picto } from '../../components/Picto'
import { ListGroup } from '../../components/ListGroup'
import { ListRow } from '../../components/ListRow'
import { LargeTitle } from '../../components/LargeTitle'
import { Screen } from '../../components/Screen'
import { nl } from '../../text/nl'
import { PICTO_IDS } from '../pictos/pictos'
import './gallery.css'

export function PictoGallery() {
  return (
    <Screen>
      <LargeTitle>{nl.gallery.title}</LargeTitle>
      <p className="gallery__intro">{nl.gallery.intro}</p>
      <div className="gallery__grid">
        {PICTO_IDS.map((id) => (
          <figure key={id} className="gallery__item">
            <span className="gallery__big">
              <Picto id={id} />
            </span>
            <figcaption>{nl.pictoWords[id].name}</figcaption>
          </figure>
        ))}
      </div>
      <p className="gallery__intro">{nl.gallery.inRows}</p>
      <ListGroup>
        {PICTO_IDS.map((id) => (
          <ListRow key={id} image={<Picto id={id} />} title={nl.pictoWords[id].name} />
        ))}
      </ListGroup>
    </Screen>
  )
}
