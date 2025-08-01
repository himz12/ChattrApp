import { THEMES } from "../constants";
import { useThemeStore } from '../store/useThemeStore'
import { Send } from 'lucide-react';

const PREVIEW_MESSAGES = [
  { id: 1, content: "Bro I just woke up and it's 2 PM 😭", isSent: false },
  { id: 2, content: "Living the dream, I see 😂", isSent: true }
]

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className='min-h-screen w-full px-4 pt-20 lg:max-w-6xl lg:mx-auto'>
      <div className='space-y-6'>
        {/* Theme Selection */}
        <div className='flex flex-col gap-1'>
          <h2 className='text-lg font-semibold'>Theme</h2>
          <p className='text-sm text-base-content/70'>Your chat, your rules. Select a theme.</p>
        </div>

        {/* Theme Buttons */}
        <div className='grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-2'>
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}`}
              onClick={() => setTheme(t)}
            >
              <div className='relative h-8 w-full rounded-md overflow-hidden' data-theme={t}>
                <div className='absolute inset-0 grid grid-cols-4 gap-px p-1'>
                  <div className='rounded bg-primary'></div>
                  <div className='rounded bg-secondary'></div>
                  <div className='rounded bg-accent'></div>
                  <div className='rounded bg-neutral'></div>
                </div>
              </div>
              <span className='text-[11px] font-medium truncate w-full text-center'>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className='text-lg font-semibold mb-3'>Preview</h3>
        <div className='rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg'>
          <div className='p-4 bg-base-200'>
            <div className='max-w-lg mx-auto'>
              <div className='bg-base-100 rounded-xl shadow-sm overflow-hidden'>
                <div className='px-4 py-3 border-b border-base-300 bg-base-100'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium'>I</div>
                    <div className='font-medium text-sm'>Is?</div>
                    <p className='text-xs text-base-content/78'>Online</p>
                  </div>
                </div>

                {/* Message Preview */}
                <div className='p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100'>
                  {PREVIEW_MESSAGES.map((messages) => (
                    <div key={messages.id} className={`flex ${messages.isSent ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-xl p-3 shadow-sm ${messages.isSent ? "bg-primary text-primary-content" : "bg-base-100"}`}>
                        <p className='text-sm'>{messages.content}</p>
                        <p className={`text-[10px] mt-1.5 ${messages.isSent ? "text-primary-content/70" : "text-base-content/70"}`}>12:00 PM</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Preview */}
                <div className='p-4 border-t border-base-300 bg-base-100'>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      className='input input-bordered flex-1 text-sm h-10'
                      placeholder='Type a message...'
                      value='This is a preview'
                      readOnly
                    />
                    <button className='btn btn-primary h-10 min-h-0'>
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div> {/* End of message card */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
