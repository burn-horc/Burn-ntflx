import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function AccessPage({ onAccessGranted }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleUnlock = async () => {
    if (!code.trim() || loading) return;

    try {
      setLoading(true);
      setError(false);

      const { data, error: rpcError } = await supabase.rpc("use_access_code", {
        input_code: code,
      });

      if (rpcError || !data?.success) {
        throw new Error(data?.error || "Invalid code");
      }

      setFadeOut(true);

      setTimeout(() => {
        localStorage.setItem("access_code", code);
        onAccessGranted();
      }, 800);
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">

        <div className="particles"></div>

        <div className={`card ${error ? "shake" : ""} ${fadeOut ? "fade" : ""}`}>
          <h2>Private Access</h2>
          <p className="subtitle">Enter your private invite code</p>

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Access Code"
          />

          <button onClick={handleUnlock} disabled={loading}>
            {loading ? <span className="spinner"></span> : "Unlock"}
          </button>
        </div>

        <div className="community">
          <p>For private code</p>
          <p>Message me on</p>

          <div className="social-icons">

            <a
              href="https://www.facebook.com/burn024/"
              target="_blank"
              rel="noopener noreferrer"
              className="social fb"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Facebook_Logo_%282019%29.svg"/>
            </a>

            <a
              href="https://t.me/BURNx24"
              target="_blank"
              rel="noopener noreferrer"
              className="social tg"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"/>
            </a>

          </div>
        </div>

      </div>

<style>{`

.container{
height:100vh;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
font-family:-apple-system,BlinkMacSystemFont,sans-serif;
background:#0d0d0d;
overflow:hidden;
position:relative;
}

.particles{
position:absolute;
width:100%;
height:100%;
background:
radial-gradient(circle at 20% 20%,rgba(124,140,255,.2),transparent 40%),
radial-gradient(circle at 80% 70%,rgba(180,120,255,.2),transparent 40%);
animation:moveBg 12s linear infinite alternate;
}

@keyframes moveBg{
0%{transform:scale(1)}
100%{transform:scale(1.3)}
}

.card{
background:rgba(22,22,22,.75);
backdrop-filter:blur(18px);
border:1px solid rgba(255,255,255,.05);
padding:45px 35px;
border-radius:22px;
width:330px;
text-align:center;
box-shadow:0 25px 60px rgba(0,0,0,.7);
animation:enter .8s ease;
}

@keyframes enter{
from{opacity:0;transform:translateY(40px)}
to{opacity:1;transform:translateY(0)}
}

h2{
margin-bottom:6px;
font-weight:600;
color:white;
}

.subtitle{
color:#888;
font-size:14px;
margin-bottom:28px;
}

input{
width:100%;
padding:14px;
border-radius:12px;
border:1px solid #333;
background:#0f0f0f;
color:white;
outline:none;
margin-bottom:22px;
font-size:15px;
}

input:focus{
border:1px solid #7c8cff;
box-shadow:0 0 14px rgba(124,140,255,.7);
}

button{
width:100%;
padding:14px;
border-radius:14px;
border:none;
font-weight:600;
font-size:16px;
color:white;
cursor:pointer;
background:linear-gradient(90deg,#5c6cff,#8f5cff,#5c6cff);
background-size:200% 200%;
animation:gradientMove 4s ease infinite;
}

button:hover{
transform:translateY(-2px);
box-shadow:0 10px 25px rgba(92,108,255,.4);
}

.spinner{
width:18px;
height:18px;
border:2px solid rgba(255,255,255,.3);
border-top:2px solid white;
border-radius:50%;
animation:spin .7s linear infinite;
}

@keyframes spin{
to{transform:rotate(360deg)}
}

@keyframes gradientMove{
0%{background-position:0% 50%}
50%{background-position:100% 50%}
100%{background-position:0% 50%}
}

.shake{animation:shake .4s}

@keyframes shake{
0%{transform:translateX(0)}
25%{transform:translateX(-6px)}
50%{transform:translateX(6px)}
75%{transform:translateX(-6px)}
100%{transform:translateX(0)}
}

.fade{
opacity:0;
transform:scale(.95);
}

.community{
margin-top:25px;
text-align:center;
color:#aaa;
}

.social-icons{
margin-top:12px;
display:flex;
justify-content:center;
gap:22px;
}

.social{
width:46px;
height:46px;
display:flex;
align-items:center;
justify-content:center;
border-radius:50%;
background:rgba(255,255,255,.05);
backdrop-filter:blur(10px);
animation:float 4s ease-in-out infinite;
transition:.3s;
}

.social img{
width:24px;
}

.fb:hover{
box-shadow:0 0 15px rgba(24,119,242,.8);
transform:scale(1.15);
}

.tg:hover{
box-shadow:0 0 15px rgba(0,170,255,.8);
transform:scale(1.15);
}

@keyframes float{
0%{transform:translateY(0)}
50%{transform:translateY(-6px)}
100%{transform:translateY(0)}
}

`}</style>

    </>
  );
}
