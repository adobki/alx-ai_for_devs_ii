import { createPollAction, submitVoteAction } from '@/app/actions/polls.ts'

describe('Poll Actions', () => {
  describe('createPollAction', () => {
    it('should create a poll with valid data', async () => {
      const formData = new FormData()
      formData.append('question', 'What is your favorite color?')
      formData.append('options', 'Red')
      formData.append('options', 'Blue')
      formData.append('options', 'Green')

      const result = await createPollAction(formData)

      expect(result).toEqual({ id: 'placeholder-id' })
    })

    it('should throw error when question is missing', async () => {
      const formData = new FormData()
      formData.append('options', 'Red')
      formData.append('options', 'Blue')

      await expect(createPollAction(formData)).rejects.toThrow(
        'Question and at least two options are required'
      )
    })

    it('should throw error when question is empty', async () => {
      const formData = new FormData()
      formData.append('question', '   ')
      formData.append('options', 'Red')
      formData.append('options', 'Blue')

      await expect(createPollAction(formData)).rejects.toThrow(
        'Question and at least two options are required'
      )
    })

    it('should throw error when less than 2 options provided', async () => {
      const formData = new FormData()
      formData.append('question', 'What is your favorite color?')
      formData.append('options', 'Red')

      await expect(createPollAction(formData)).rejects.toThrow(
        'Question and at least two options are required'
      )
    })

    it('should throw error when no options provided', async () => {
      const formData = new FormData()
      formData.append('question', 'What is your favorite color?')

      await expect(createPollAction(formData)).rejects.toThrow(
        'Question and at least two options are required'
      )
    })

    it('should filter out empty options', async () => {
      const formData = new FormData()
      formData.append('question', 'What is your favorite color?')
      formData.append('options', 'Red')
      formData.append('options', '   ')
      formData.append('options', 'Blue')
      formData.append('options', '')

      const result = await createPollAction(formData)

      expect(result).toEqual({ id: 'placeholder-id' })
    })

    it('should trim option whitespace', async () => {
      const formData = new FormData()
      formData.append('question', 'What is your favorite color?')
      formData.append('options', '  Red  ')
      formData.append('options', '  Blue  ')

      const result = await createPollAction(formData)
      
      expect(result).toEqual({ id: 'placeholder-id' })
    })
  })

  describe('submitVoteAction', () => {
    it('should submit a vote with valid data', async () => {
      const formData = new FormData()
      formData.append('pollId', 'poll-123')
      formData.append('optionId', 'option-456')

      const result = await submitVoteAction(formData)
      
      expect(result).toEqual({ ok: true })
    })

    it('should throw error when pollId is missing', async () => {
      const formData = new FormData()
      formData.append('optionId', 'option-456')

      await expect(submitVoteAction(formData)).rejects.toThrow(
        'Missing pollId or optionId'
      )
    })

    it('should throw error when optionId is missing', async () => {
      const formData = new FormData()
      formData.append('pollId', 'poll-123')

      await expect(submitVoteAction(formData)).rejects.toThrow(
        'Missing pollId or optionId'
      )
    })

    it('should throw error when both pollId and optionId are missing', async () => {
      const formData = new FormData()

      await expect(submitVoteAction(formData)).rejects.toThrow(
        'Missing pollId or optionId'
      )
    })

    it('should throw error when pollId is empty', async () => {
      const formData = new FormData()
      formData.append('pollId', '')
      formData.append('optionId', 'option-456')

      await expect(submitVoteAction(formData)).rejects.toThrow(
        'Missing pollId or optionId'
      )
    })

    it('should throw error when optionId is empty', async () => {
      const formData = new FormData()
      formData.append('pollId', 'poll-123')
      formData.append('optionId', '')

      await expect(submitVoteAction(formData)).rejects.toThrow(
        'Missing pollId or optionId'
      )
    })
  })
})
