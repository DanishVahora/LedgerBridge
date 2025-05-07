export default function Footer(){
    return(
        <footer className="bg-[#006A71] text-white pt-16 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#006A71] font-bold text-xl">
                  LB
                </div>
                <span className="ml-2 text-white font-bold text-xl">LedgerBridge</span>
              </div>
              <p className="text-[#9ACBD0] mb-6 max-w-md">
                Transforming the way businesses access working capital through innovative invoice discounting solutions.
              </p>
              <div className="flex space-x-4">
                {/* Social media placeholders */}
                {['facebook', 'twitter', 'linkedin', 'instagram'].map((social, index) => (
                  <a key={index} href={`#${social}`} className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'News', 'Contact'].map((item, index) => (
                  <li key={index}>
                    <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#9ACBD0] hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Blog', 'Case Studies', 'FAQs', 'Support'].map((item, index) => (
                  <li key={index}>
                    <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#9ACBD0] hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Security', 'Compliance'].map((item, index) => (
                  <li key={index}>
                    <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#9ACBD0] hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#9ACBD0] border-opacity-30 pt-6 text-sm text-[#9ACBD0]">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>© {new Date().getFullYear()} LedgerBridge. All rights reserved.</div>
              <div className="mt-4 md:mt-0">
                Made with ♥ for businesses worldwide
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
}