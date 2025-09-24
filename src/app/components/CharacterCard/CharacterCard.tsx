import { Characters } from "../../services/fetcher";
import styles from './CharacterCard.module.css'
import Image from "next/image";

interface Props {
  character: Characters
}

const CharacterCard = ({ character }: Props) => {
  let statusText = character.status

  if (statusText === 'unknown') statusText = 'Desconhecido'
  else {
    statusText = statusText === 'Alive' ? 'Vivo' : 'Morto'
  }

  return (
    <div className={styles.card}>
      <Image 
        src={character.image}
        alt={character.name}
        width={120}
        height={120}
        className={styles.image}
      />
      
      <div className={styles.text}>
        <b>{character.name}</b>
        <span>Status: {statusText}</span>
        <span>Espécie: {character.species}</span>
      </div>
    </div>
  )
}

export default CharacterCard;