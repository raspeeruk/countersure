export function loginEmail(url: string, expires: Date) {
  const destination = new URL(url);
  if (destination.origin !== 'https://countersure.com') {
    throw new Error('Unexpected login email destination');
  }
  const safeUrl = url.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const expiry = expires.toUTCString();
  return {
    subject: 'Your Countersure sign-in link',
    text: `Sign in to Countersure\n\nUse this secure link to access your account:\n${url}\n\nThis link expires ${expiry}. If you did not request it, ignore this email. Never share your sign-in link.\n\nCountersure · Know who you trade with.\nhttps://countersure.com\nHelp: countersure@rogergroup.xyz`,
    html: `<!doctype html><html lang="en"><body style="margin:0;background:#f5f4ef;font-family:Arial,sans-serif;color:#17202a"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:white;border-top:5px solid #183e35"><tr><td style="padding:32px"><p style="font-size:26px;font-weight:bold;margin:0;color:#183e35">Countersure</p><p style="color:#64748b;font-size:13px;margin:6px 0 28px">countersure.com</p><h1 style="font-size:24px">Your secure sign-in link</h1><p style="line-height:1.6">Sign in to manage your Countersure account.</p><p style="margin:28px 0"><a href="${safeUrl}" style="display:inline-block;background:#183e35;color:#fff;padding:15px 22px;border-radius:4px;font-weight:bold;text-decoration:none">Sign in to Countersure</a></p><p style="font-size:13px;color:#64748b;line-height:1.6">This link expires ${expiry}. If you did not request it, ignore this email. Never share your sign-in link.</p></td></tr><tr><td style="padding:20px 32px;background:#f8fafc;font-size:12px;line-height:1.8">Countersure · Know who you trade with.<br><a href="https://countersure.com">countersure.com</a> · <a href="mailto:countersure@rogergroup.xyz">Contact support</a></td></tr></table></td></tr></table></body></html>`,
  };
}
