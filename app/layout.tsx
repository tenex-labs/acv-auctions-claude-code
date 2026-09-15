import './globals.css';
export const metadata = { title: 'Inspection Desk', description: 'Vehicle inspection records and reports' };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><header className="site-header"><a className="brand" href="/">Inspection Desk</a><span>Vehicle records</span></header><main>{children}</main><footer>Inspection Desk · Sample vehicle records</footer></body></html>;
}
