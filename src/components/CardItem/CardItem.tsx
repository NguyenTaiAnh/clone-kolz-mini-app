import React from 'react'
import CharacterCard from './CharacterCard'
import { useStore } from '@stores'
import { useGetConversations } from '@hooks'
import { useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '@constants/queryKeys'

interface CardItemProps {
  onChatClick: any
}
const CardItem: React.FC<CardItemProps> = ({ onChatClick }) => {
  // const [loading, setLoading] = useState(false);
  // const {characters, setCharacters} = useAuth();
  const { characters, setCharacters } = useStore()
  // const {data, isLoading} = useGetConversations()
  const characterQuery = useGetConversations()
  const queryClient = useQueryClient()
  React.useEffect(() => {
    if (characterQuery && characterQuery.data) {
      console.log('check data: ', characterQuery.data)
      setCharacters(characterQuery.data.data)
    }
    if (!characters.length) {
      queryClient.refetchQueries({
        queryKey: [QueryKeys.CONVERSATIONS],
        type: 'active'
      })
    }
  }, [characters, characterQuery.data])

  if (characterQuery.isLoading) {
    return <div>Loading characters...</div>
  }

  return (
    <div className='grid grid-cols-2 gap-4 p-4 mt-8 pb-7'>
      {characters &&
        characters.length > 0 &&
        characters.map((char: any) => <CharacterCard key={char.id} {...char} onClick={() => onChatClick(char.id)} />)}
    </div>
  )
}

export default React.memo(CardItem)