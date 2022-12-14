//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Microcube_worker.js


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// WASI_API.js

// https://github.com/WebAssembly/WASI/blob/main/phases/snapshot/docs.md
// https://docs.rs/wasi/0.10.2+wasi-snapshot-preview1/wasi/wasi_snapshot_preview1/index.html


let DATA_ADDR = null;

let WASI_API = {
    //////////////////////////////////////////////////////////////
    // WASI constants
    WASI_ESUCCESS: WASI_ESUCCESS = 0,
    WASI_EBADF : WASI_EBADF = 8,
    WASI_EINVAL : WASI_EINVAL = 28,
    WASI_ENOSYS : WASI_ENOSYS = 52,

    WASI_STDOUT_FILENO : WASI_STDOUT_FILENO = 1,
    WASI_STDERR_FILENO : WASI_STDERR_FILENO = 2,

    WASI_SEEK_START : WASI_SEEK_START = 0,
    WASI_SEEK_CUR : WASI_SEEK_CUR = 1,
    WASI_SEEK_END : WASI_SEEK_END = 2,

    WASI_PREOPENTYPE_DIR : WASI_PREOPENTYPE_DIR = 0,


    WASI_CLOCKID_REALTIME : WASI_CLOCKID_REALTIME =  0,
    WASI_CLOCKID_MONOTONIC : WASI_CLOCKID_MONOTONIC =  1,
    WASI_CLOCKID_PROCESS_CPUTIME_ID : WASI_CLOCKID_PROCESS_CPUTIME_ID=  2,
    WASI_CLOCKID_THREAD_CPUTIME_ID : WASI_CLOCKID_THREAD_CPUTIME_ID=  3,

    WASI_FILETYPE_UNKNOWN : WASI_FILETYPE_UNKNOWN=  0,
    WASI_FILETYPE_BLOCK_DEVICE : WASI_FILETYPE_BLOCK_DEVICE=  1,
    WASI_FILETYPE_CHARACTER_DEVICE  :WASI_FILETYPE_CHARACTER_DEVICE=  2,
    WASI_FILETYPE_DIRECTORY : WASI_FILETYPE_DIRECTORY=  3,
    WASI_FILETYPE_REGULAR_FILE : WASI_FILETYPE_REGULAR_FILE=  4,
    WASI_FILETYPE_SOCKET_DGRAM : WASI_FILETYPE_SOCKET_DGRAM=  5,
    WASI_FILETYPE_SOCKET_STREAM : WASI_FILETYPE_SOCKET_STREAM=  6,
    WASI_FILETYPE_SYMBOLIC_LINK : WASI_FILETYPE_SYMBOLIC_LINK=  7,

    //////////////////////////////////////////////////////////////
    // WASABI variables
    WASASBI_SERVER_ROOT_PATH : WASASBI_SERVER_ROOT_PATH = null,
    fs_Path2Data : fs_Path2Data = new Map(),

    // env : { [key: string]: string | undefined };
    env : env = {},
    fds : fds = [
        {
            virtualPath:"/dev/stdin", offset:BigInt(0), data:null
        },
        {
            virtualPath:"/dev/stdout", offset:BigInt(0), data:null
        },
        {
            virtualPath:"/dev/stderr", offset:BigInt(0), data:null
        },
        {
            virtualPath:".", offset:BigInt(0), data:null
        },
    ],
    moduleWasm : moduleWasm = null,
    moduleMemoryView : moduleMemoryView = null,

    //////////////////////////////////////////////////////////////
    // WASABI variables
    setModule : setModule = function (module) {
        moduleWasm = module;
        moduleMemoryView = new DataView(getModuleInstanceExports().memory.buffer);
    },
    start : start = function () {
        if(getModuleInstanceExports().asyncify_get_state)
            log('start, asyncify_get_state:'+getModuleInstanceExports().asyncify_get_state());
        else 
            log('wasm module not asyncified');

        if(getModuleInstanceExports()._initialize)
            getModuleInstanceExports()._initialize();
        else if(getModuleInstanceExports()._start)
            getModuleInstanceExports()._start();
        else
            throw Error("no _start/_initialize entry point");

        if(getModuleInstanceExports().asyncify_get_state) {
            if(getModuleInstanceExports().asyncify_get_state()==1) {
                getModuleInstanceExports().asyncify_stop_unwind();
                log('2 asyncify_stop_unwind(ed), state:'+getModuleInstanceExports().asyncify_get_state());
            }
        } else {
            wasabi_log('wasm module not asyncified');
        }
    },

    doIt : doIt = function(ID, type, query) {
        try {
            var queryWAsm = convertJSStr2WAsm(query);
            getModuleInstanceExports().doIt(ID, type, queryWAsm);
            if(getModuleInstanceExports().asyncify_get_state) {
                if(getModuleInstanceExports().asyncify_get_state()==1) {
                    getModuleInstanceExports().asyncify_stop_unwind();
                    log('2 asyncify_stop_unwind(ed), state:'+getModuleInstanceExports().asyncify_get_state());
                }
            }
        } finally {
            getModuleInstanceExports().free(queryWAsm);
        }
    },

    getModuleInstanceExports : getModuleInstanceExports =function () {
        return moduleWasm.instance.exports;
    },

    // Memory
    updatedMemoryView : updatedMemoryView = function() {
        moduleMemoryView = new DataView(getModuleInstanceExports().memory.buffer);
        return moduleMemoryView;
    },
    memoryView : memoryView = function() {
        return moduleMemoryView;
    },
    malloc : malloc = function (size) {
        if(!getModuleInstanceExports().malloc)
            throw Error("malloc not exported fomr the WAsm module");

        let ptr = getModuleInstanceExports().malloc(size);
        moduleMemoryView = new DataView(getModuleInstanceExports().memory.buffer);
        return ptr;
    },
    free : free = function (ptr) {
        if(!getModuleInstanceExports().free)
        throw Error("free not exported fomr the WAsm module");

        getModuleInstanceExports().free(ptr);
        moduleMemoryView = new DataView(getModuleInstanceExports().memory.buffer);
    },
    convertJSStr2WAsm : convertJSStr2WAsm =function(js_str)
    {
        if(js_str==null)
            return null;
        let uint8array = new TextEncoder("utf-8").encode(js_str);
        let size = uint8array.length;

        let wasm_str = malloc(size+1);
        for (let i = 0; i < size; i++) {
            memoryView().setUint8(wasm_str+i, uint8array[i], true);
        }
        memoryView().setUint8(wasm_str+size, 0, true);

        return wasm_str;
    },
    convertWAsmStr2JSStr : convertWAsmStr2JSStr = function (str_ptr)
    {
        let str = "";
        let memory = updatedMemoryView();
        for (let i = str_ptr; memory.getUint8(i) != 0; ++i)
            str += String.fromCharCode(memory.getUint8(i));
        return str;
    },

    //////////////////////////////////////////////////////////////
    // WASABI API
    //*************************************************************
    // wasabi specific
    wasabi_getServeFSPath : wasabi_getServeFSPath = function(virtualPath) {
        let path = null;
        if(WASASBI_SERVER_ROOT_PATH != null && WASASBI_SERVER_ROOT_PATH != "" )
            path = WASASBI_SERVER_ROOT_PATH + virtualPath;
        else
            path = virtualPath;

        return path;
    },
    wasabi_initFS : async function(rootFS, paths) {
        WASASBI_SERVER_ROOT_PATH = rootFS;
        for (let i=0; i<paths.length; i++)  {
            let virtualPath = paths[i];
            let path = wasabi_getServeFSPath(virtualPath);
            const response = await fetch(path);
            if (response.status >= 400 && response.status < 600) {
                response.text().then(function (text) {
                    throw new Error("Bad response from server response.status='"+response.status+"' " + text + "'");
                  });
              }
            let arrayBuffer = await response.arrayBuffer();
            let uint8View = new Uint8Array(arrayBuffer);

            if(virtualPath.substring(0, 1) == "/")
                virtualPath = virtualPath.substring(1);
            fs_Path2Data.set(virtualPath, uint8View);
            log("WASI FileSystem: [" +WASASBI_SERVER_ROOT_PATH + "," + virtualPath + "] loaded from '" + path + "' (" + uint8View.length + " bytes)");
        }
    },
    wasabi_getFileEntry : wasabi_getFileEntry = function(fd) {
        const entry = fds[fd];
        if (!entry) {
            error("Invalid fd="+fd);
            return null;
        } else if (!entry.virtualPath) {
            error("No virtualPath for fd="+fd);
            return null;
        }

        if(!entry.data) {
            entry.data = fs_Path2Data.get(entry.virtualPath);
            if(!entry.data)
            {
                error("Please register your file '" + entry.virtualPath + "' by calling WASI_API::wasabi_initFS()");
                return null;
            }
            entry.offset = BigInt(0);
        }
        return entry;
    },
    wasabi_initEnv : async function(environ) {
        env = environ ? environ : {} ;
    },

    log : log = function(msg) {
        //console.log("WASI-"+arguments.callee.caller.name + ":" + msg);
    },
    error : error = function(msg) {
        console.error("WASI: " + msg);
    },

    //*************************************************************
    // stdout and stderr
    wasabi_log : wasabi_log = function(msg) {
        console.log(msg);
        if(typeof document !== 'undefined') {
            msg += "\n";
            document.getElementById('log').innerHTML += msg.replace(/\n( *)/g, function (match, p1) {
                return '<br>' + '&nbsp;'.repeat(p1.length);
            });
        }
    },
    wasabi_error : wasabi_error = function(msg) {
        console.error(msg);
        if(typeof document !== 'undefined') {
            let forHTML= msg += "\n";
            document.getElementById('log').innerHTML += forHTML.replace(/\n( *)/g, function (match, p1) {
                return '<br>' + '&nbsp;'.repeat(p1.length);
            });
        }

        // For the moment JS excpetion can be throw by writing in the error output
        // 'throw this message' was also hardcoded in the c++ code in cxa_exception.cpp
        let contains = msg.startsWith('throw this message');
        if(contains) {
            throw Error(msg.substring(18));//TODO: Throw a specific error to allow caller to cacth it and unload reload the module
        }
    },

    // Clock and time
    clock_res_realtime : clock_res_realtime = function() {
        return BigInt(1e6);
    },

    clock_res_monotonic : clock_res_monotonic = function() {
        return BigInt(1e3);
    },
    clock_res_thread : clock_res_thread = function() {
        return clock_res_monotonic();
    },
    clock_res_process : clock_res_process = function() {
        return clock_res_monotonic();
    },
    clock_time_realtime : clock_time_realtime = function() {
        return BigInt(Date.now()) * BigInt(1e6);
    },

    clock_time_monotonic : clock_time_monotonic = function() {
        const t = performance.now();
        const s = Math.trunc(t);
        const ms = Math.floor((t - s) * 1e3);

        return (BigInt(s) * BigInt(1e9)) + (BigInt(ms) * BigInt(1e6));
    },
    clock_time_process : clock_time_process = function() {
        return clock_time_monotonic();
    },
    clock_time_thread : clock_time_process = function() {
        return clock_time_monotonic();
    },


    //////////////////////////////////////////////////////////////
    // WASI API
    //*************************************************************
    // process
    proc_exit: function(rval) {
        log(Array.prototype.slice.call(arguments));
        throw Error("wasi proc_exit with code :" + rval);
    },

    //*************************************************************
    // path
    path_open: function(dirfd, dirflags, path_ptr, path_len, oflags, fs_rights_base, fs_rights_inheriting, fs_flags, fd) {
        log(Array.prototype.slice.call(arguments));
        let virtualPath  = convertWAsmStr2JSStr(path_ptr);
        log("virtualPath:'" + virtualPath +"'");

        const entry = fds[dirfd];
        if (!entry) {
            error("Invalid dirfd=" + dirfd);
            return WASI_EBADF;
        } else if (!entry.virtualPath) {
            error("No virtualPath for dirfd="+dirfd);
            return WASI_EINVAL;
        }

        // Verify that the file is already register during wasabi_initFS
        if(!fs_Path2Data.get(virtualPath)) {
            if(virtualPath.substring(0, 1) == ".")
                virtualPath = virtualPath.substring(1);
            if(virtualPath.substring(0, 1) == "/")
                virtualPath = virtualPath.substring(1);

            if(!fs_Path2Data.get(virtualPath))
            {
                if(getModuleInstanceExports().asyncify_get_state)
                {
                    const memoryStackSize = 1024*1000;
                    if(DATA_ADDR  == null)
                    {
                        DATA_ADDR = malloc(memoryStackSize);
                    }
                    memoryView().setUint32(DATA_ADDR, DATA_ADDR+8, true);
                    memoryView().setUint32(DATA_ADDR+4, memoryStackSize, true);
                    try {
                        getModuleInstanceExports().asyncify_start_unwind(DATA_ADDR);
                        log('1 asyncify_start_unwind(ed), state:'+getModuleInstanceExports().asyncify_get_state());
                        log('fetch start');
                        fetch(virtualPath)
                        .then(
                            function(response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' + response.status);
                                return WASI_EBADF;
                            }
                            response.arrayBuffer().then(function(data) {
                                let uint8View = new Uint8Array(data);
                
                                if(virtualPath.substring(0, 1) == "/")
                                    virtualPath = virtualPath.substring(1);
                                WASI_API.fs_Path2Data.set(virtualPath, uint8View);
                                log('fetch ended');
                                this.getModuleInstanceExports().asyncify_start_rewind(DATA_ADDR);
                                log('3 asyncify_start_rewind(ed), state:'+getModuleInstanceExports().asyncify_get_state());
                                // The code is now ready to rewind; to start the process, enter the
                                // first function that should be on the call stack.
                                if(WASI_API.doIt) {
                                    WASI_API.doIt(-1, -1, null);
                                } else
                                    start();
                                });
                            }
                        )
                        .catch(function(err) {
                            console.log('Fetch Error :-S', err);
                        });

                        return;
                    }catch(e) {
                        error(e);
                    }
                }
                else
                {
                    error("Please register your file '" + virtualPath + "' by calling WASI_API::wasabi_initFS()");
                    return WASI_EBADF;
                }
            }
            entry.offset = BigInt(0);
        }
        if(getModuleInstanceExports().asyncify_get_state && getModuleInstanceExports().asyncify_get_state() == 2) {
            // We are called as part of a resume/rewind. Stop sleeping.
            getModuleInstanceExports().asyncify_stop_rewind();
            log('4 asyncify_stop_rewind(ed), state:'+getModuleInstanceExports().asyncify_get_state());
        }

        let offset = BigInt(0);
        const opened_fd = fds.push({virtualPath, offset}) - 1;
        updatedMemoryView().setUint32(fd, opened_fd, true);

        return WASI_ESUCCESS;
    },
    path_filestat_get: function(fd, flags, path_ptr, path_len, buf) {
        log(Array.prototype.slice.call(arguments));
        log("path_ptr:'" + convertWAsmStr2JSStr(path_ptr) +"'");
        error("function path_filestat_get not yet implemented");
        return WASI_ENOSYS;
    },
    path_unlink_file: function(fd, path_ptr, path_len) {
        log(Array.prototype.slice.call(arguments));
        log("path_ptr:'" + convertWAsmStr2JSStr(path_ptr) +"'");
        error("function path_unlink_file not yet implemented");
        return WASI_ENOSYS;
    },

    //*************************************************************
    // async stuff
    poll_oneoff: function(in_, out, nsubscriptions, nevents) {
        log(Array.prototype.slice.call(arguments));
        error("function poll_oneoff not yet implemented");
        return WASI_ENOSYS;
    },


    //*************************************************************
    // file descriptor
    fd_sync: function(fd) {
        log(Array.prototype.slice.call(arguments));
        error("function ifd_sync not yet implemented");
        return WASI_ENOSYS;
    },
    fd_seek: function(fd, offset, whence, newoffset_ptr) {
        log(Array.prototype.slice.call(arguments));
        const entry = fds[fd];
        if (!entry) {
            error("Invalid fd=" + fd);
            return WASI_EBADF;
        }
        if(whence == WASI_SEEK_START)
            entry.offset = offset;
        else if(whence == WASI_SEEK_CUR) {
            entry.offset += offset;
        } else if(whence == WASI_SEEK_END) {
            entry.offset += offset;
        } else {
            error("fd_seek invalid whence");
            return WASI_EINVAL;
        }

        if(entry.offset < 0)
            entry.offset = BigInt(0);

        updatedMemoryView().setBigUint64(newoffset_ptr, BigInt(entry.offset), true);

        return WASI_ESUCCESS;
    },
    fd_write: function(fd, iovs_ptr, iovs_len, nwritten_ptr) {
        log(Array.prototype.slice.call(arguments));
        const entry = fds[fd];
        if (!entry) {
            error("Invalid fd=" + fd);
            return WASI_EBADF;
        } else if (!entry.virtualPath) {
            error("No virtualPath for fd="+fd);
            return WASI_EINVAL;
        }


        let written = 0;
        let bufferBytes = [];

        let memory = updatedMemoryView();
        function getiovs(iovs_ptr, iovs_len) {
            // iovs_ptr* -> [iov, iov, ...]
            // __wasi_ciovec_t {
            //   void* buf,
            //   size_t buf_len,
            // }
            let buffers = Array.from({ length: iovs_len }, function (_, i) {
                   let ptr = iovs_ptr + i * 8;
                   let buf = memory.getUint32(ptr, true);
                   let bufLen = memory.getUint32(ptr + 4, true);

                   return new Uint8Array(this.getModuleInstanceExports().memory.buffer, buf, bufLen);
                });

            return buffers;
        }
        let buffers = getiovs(iovs_ptr, iovs_len);
        function writev(iov) {
            let b = 0;
            for (; b < iov.byteLength; b++) {
               bufferBytes.push(iov[b]);
            }
            written += b;
        }

        buffers.forEach(writev);

        if (fd === WASI_STDOUT_FILENO) wasabi_log(String.fromCharCode.apply(null, bufferBytes));
        else if (fd === WASI_STDERR_FILENO) wasabi_error(String.fromCharCode.apply(null, bufferBytes));
        else {
            error("function fd_write Not Yet Implemented");
            return WASI_ENOSYS;
        }

        memory.setUint32(nwritten_ptr, written, true);

        return WASI_ESUCCESS;
    },
    fd_read: function(fd, iovs_ptr, iovs_len, nread_ptr) {
        log(Array.prototype.slice.call(arguments));
        const entry = wasabi_getFileEntry(fd);
        if (!entry) {
            return WASI_EBADF;
        }

        let memory = updatedMemoryView();
        let nread = 0;
        for (let i = 0; i < iovs_len; i++) {
            const data_ptr = memory.getUint32(iovs_ptr, true);
            iovs_ptr += 4;

            const data_len = memory.getUint32(iovs_ptr, true);
            iovs_ptr += 4;

            const data = new Uint8Array(getModuleInstanceExports().memory.buffer, data_ptr, data_len);
            for(let j =0; j < data_len && entry.offset < entry.data.length ; j++) {
                data[j] = entry.data[entry.offset++];
                nread++;
            }
        }
        memory.setUint32(nread_ptr, nread, true);

        return WASI_ESUCCESS;
    },
    fd_close: function(fd) {
        log(Array.prototype.slice.call(arguments));
        const entry = fds[fd];
        if (!entry) {
            error('Invalid fd='+fd);
            return WASI_EBADF;
        }
        fds.splice(fd);
        return WASI_ESUCCESS;
    },
    fd_filestat_get: function(fd, buf_ptr) {
        log(Array.prototype.slice.call(arguments));
        const entry = wasabi_getFileEntry(fd);
        if (!entry) {
            return WASI_EBADF;
        }

        // Device ID of device containing the file.
        this.updatedMemoryView().setUint32(buf_ptr , 0, true);
        this.memoryView().setUint32(buf_ptr + 4, 0, true);

        // File serial number.
        this.memoryView().setUint32(buf_ptr + 8, 0, true);
        this.memoryView().setUint32(buf_ptr + 12, 0, true);

        // File type.
        this.memoryView().setUint8(buf_ptr + 16, WASI_FILETYPE_REGULAR_FILE, true);
        this.memoryView().setUint32(buf_ptr + 20, 0, true);

        // Number of hard links to the file.
        this.memoryView().setUint32(buf_ptr + 24, 0 , true);
        this.memoryView().setUint32(buf_ptr + 28, 0 , true);

        // For regular files, the file size in bytes. For symbolic links, the length in bytes of the pathname contained in the symbolic
        this.memoryView().setUint32(buf_ptr + 32, entry.data.length, true);
        this.memoryView().setUint32(buf_ptr + 36, 0, true);

        // Last data access timestamp.
        this.memoryView().setUint32(buf_ptr + 40, 0, true);
        this.memoryView().setUint32(buf_ptr + 44, 0, true);

        // Last data modification timestamp.
        this.memoryView().setUint32(buf_ptr + 48, 0, true);
        this.memoryView().setUint32(buf_ptr + 52, 0, true);

        // Last file status change timestamp.
        this.memoryView().setUint32(buf_ptr + 56, 0, true);
        this.memoryView().setUint32(buf_ptr + 60, 0, true);

        return WASI_ESUCCESS;
    },
    fd_fdstat_set_flags: function(fd, flags) {
        log(Array.prototype.slice.call(arguments));
        error("function fd_fdstat_set_flags not yet implemented");
    },
    fd_fdstat_get: function(fd, stat_ptr) {
        log(Array.prototype.slice.call(arguments));

        updatedMemoryView().setUint8(stat_ptr, fd);
        memoryView().setUint16(stat_ptr + 2, 0, true);
        memoryView().setUint16(stat_ptr + 4, 0, true);

        memoryView().setUint32(stat_ptr + 8, 0, true);
        memoryView().setUint32(stat_ptr + 12, 0, true);
        memoryView().setUint32(stat_ptr + 16, 0, true);
        memoryView().setUint32(stat_ptr + 20, 0, true);
/*
        function setBigUint64(byteOffset, value, littleEndian) {
            let lowWord = value;
            let highWord = 0;

            memoryView().setUint32(littleEndian ? 0 : 4, lowWord, littleEndian);
            memoryView().setUint32(littleEndian ? 4 : 0, highWord, littleEndian);
        }
*/
    //    setBigUint64(stat_ptr + 8, 0, true);
    //    setBigUint64(stat_ptr + 8 + 8, 0, true);

        return WASI_ESUCCESS;
    },
    fd_prestat_get: function(fd, buf_out) {
        log(Array.prototype.slice.call(arguments));
        const entry = fds[fd];
        if (!entry) {
            error("Invalid fd=" + fd);
            return WASI_EBADF;
        } else if (!entry.virtualPath) {
            error("No virtualPath for fd="+fd);
            return WASI_EBADF;
        }
        log("virtualPath:'" + entry.virtualPath +"'");

        let memory = updatedMemoryView();
        memory.setUint8(buf_out, WASI_PREOPENTYPE_DIR);
        memory.setUint32(buf_out + 4, new TextEncoder().encode(entry.virtualPath).byteLength, true);
        return WASI_ESUCCESS;
    },
    fd_prestat_dir_name: function(fd, path_ptr, path_len) {
        log(Array.prototype.slice.call(arguments));
        const entry = fds[fd];
        if (!entry) {
            return WASI_EBADF;
        }
        if (!entry.virtualPath) {
            return WASI_EBADF;
        }
        log("path_ptr:'" + convertWAsmStr2JSStr(path_ptr) +"'");

        const data = new Uint8Array(this.getModuleInstanceExports().memory.buffer, path_ptr, path_len);
        data.set(new TextEncoder().encode(entry.virtualPath));

        return WASI_ESUCCESS;
    },


    //*************************************************************
    // var env
    environ_sizes_get: function(environ_size, environ_buf_size) {
        log(Array.prototype.slice.call(arguments));
        const entries = Object.entries(env);
        const text = new TextEncoder();

        let memory = updatedMemoryView();
        memory.setUint32(environ_size, entries.length, true);
        memory.setUint32(environ_buf_size, entries.reduce(function(acc, [key, value]) {
            return acc + text.encode(`${key}=${value}\0`).length;
        }, 0), true);

        return WASI_ESUCCESS;
    },
    environ_get: function(environ_ptr, environ_buf_ptr) {
        log(Array.prototype.slice.call(arguments));
        const entries = Object.entries(env);
        const text = new TextEncoder();
        const heap = new Uint8Array(this.memory.buffer);

        let memory = updatedMemoryView();
        for (let [key, value] of entries) {
            memory.setUint32(environ_ptr, environ_buf_ptr, true);
            environ_ptr += 4;

            const data = text.encode(`${key}=${value}\0`);
            heap.set(data, environ_buf_ptr);
            environ_buf_ptr += data.length;
        }

        return WASI_ESUCCESS;
    },

    //*************************************************************
    // Clock

    clock_res_get: function (clock_id, resolution_out) {
        let memory = this.updatedMemoryView();
        switch (clock_id) {
            case WASI_CLOCKID_REALTIME:
                memory.setBigUint64(resolution_out, clock_res_realtime(), true);
                break;

            case WASI_CLOCKID_MONOTONIC:
                memory.setBigUint64(resolution_out, clock_res_monotonic(), true);
                break;

            case WASI_CLOCKID_PROCESS_CPUTIME_ID:
                memory.setBigUint64(resolution_out, clock_res_process(), true);
                break;

            case WASI_CLOCKID_THREAD_CPUTIME_ID:
                memory.setBigUint64(resolution_out, clock_res_thread(), true);
                break;

            default:
                return WASI_INVAL;

        }

        return WASI_ESUCCESS;
    },
    clock_time_get: function(clock_id, precision, time) {
        let memory = this.updatedMemoryView();
        log(Array.prototype.slice.call(arguments));
        switch (clock_id) {
            case WASI_CLOCKID_REALTIME:
                memory.setBigUint64(time, clock_time_realtime(), true);
                break;

            case WASI_CLOCKID_MONOTONIC:
                memory.setBigUint64(time, clock_time_monotonic(), true);
                break;

            case WASI_CLOCKID_PROCESS_CPUTIME_ID:
                memory.setBigUint64(time, clock_time_process(), true);
                break;

            case WASI_CLOCKID_THREAD_CPUTIME_ID:
                memory.setBigUint64(time, clock_time_thread(), true);
                break;

            default:
                return WASI_INVAL;

        }
        return WASI_ESUCCESS;
    },
};
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// Should match  InA_Interpreter.h/Microcube_worker.js
var eLoad = 0;
var eGetServerInfo = 1;
var eGetResponse = 2;
var eSubmitCube = 3;
var eRequestTypeName = ["Load", "GetServerInfo", "GetResponse", "SubmitCube"];

const indexMsgId = 0;
const indexMsgAction = 1;
const indexMsgParam = 2;

function initWasmModule(module, ID, action, param){
	console.log('Worker: initWasmModule');
	WASI_API.setModule(module);

	filesystem = [
	];
	WASI_API.wasabi_initFS(param, filesystem).then(() => 
	{
		WASI_API.start();
		postMessage([ID, action, '{"message": "Library well loaded"}']);
		return true;
	});
}

(function(){
var isLoaded = false;



function ina_callback_response(ID, type, inaResponse) {
	console.log("****  ina_callback_response  *****");
	console.log("Worker: Message executed: ID '" + ID + "' Type:'" + eRequestTypeName[type] + "'");
	console.log("Worker: Message executed: response");

	let js_inaResponse = WASI_API.convertWAsmStr2JSStr(inaResponse);
	try {
		console.log(JSON.parse(js_inaResponse));
	} catch(e) {
		console.error(e);
		console.log(js_inaResponse);
	}
	postMessage([ID, type, js_inaResponse]);
}

onmessage = function(e) {
	var message = e.data;
	if(message.length != 3) {
		throw 'Worker::onmessage: Expect 3 parameters';
	}

	var ID = message[indexMsgId];
	var action = message[indexMsgAction];
	var param = message[indexMsgParam];

	console.log("******************************************");
	console.log("Worker: Message received: ID '" + ID + "' Action:'" + eRequestTypeName[action] + "'");
	console.log("Worker: Message received: param");
	try {
		console.log(JSON.parse(param));
	} catch(e) {
		console.log(param);
	}

	try {
		switch(action){
		case eLoad:
			if(isLoaded == true)
				throw new Error("Worker: Already loaded");

			let imports = {ina_callback_response:ina_callback_response};
			var importObject =
			{
				wasi_snapshot_preview1: WASI_API,
				env: imports,
				js : {mem: new WebAssembly.Memory({initial: 2,maximum: 100})}
			};

			paramDev = "http://localhost:8080";
			fetch(paramDev+"/InA_Interpreter.wasm").then(response =>
					response.arrayBuffer()
				).then(bytes =>
					WebAssembly.instantiate(bytes, importObject)
				).then(module => {
					console.log("Worker: InA_Interpreter.wasm loaded from '" + paramDev +"'");
					isLoaded = initWasmModule(module, ID, action, paramDev);
				}).catch(error=>{
					fetch(param+"/InA_Interpreter.wasm").then(response =>
						response.arrayBuffer()
					).then(bytes =>
						WebAssembly.instantiate(bytes, importObject)
					).then(module => {
						console.log("Worker: InA_Interpreter.wasm loaded from '" + param + "'");
						isLoaded = initWasmModule(module, ID, action, param);
					}).catch(error=>{
						throw error;
					});
			});
/*
			fetch(param+"/InA_Interpreter.wasm").then(response =>
				response.arrayBuffer()
			).then(bytes =>
				WebAssembly.instantiate(bytes, importObject)
			).then(module => {
				console.log("Worker: InA_Interpreter.wasm loaded from '" + param + "'");
				isLoaded = initWasmModule(module, ID, action, param);
			}).catch(error=>{
				throw error;
			});
*/
			return;
		case eGetServerInfo:
			if(isLoaded == false)
				throw new Error("Not loaded");

			WASI_API.doIt(ID, eGetServerInfo, null);
			break;
		case eGetResponse:
			if(isLoaded == false)
				throw new Error("Not loaded");

			var queryJS = message[indexMsgParam];
			WASI_API.doIt(ID, eGetResponse, queryJS);
			break;
		default:
			throw  new Error('Unknow action:' + action);
		}
	} catch(error) {
		console.log('Worker: error: ', error);
		console.log("stack: ", error.stack);
		let valret = '{"HasErrors":true, "Messages": [{"Number":0,"Type":2,"Text":"'+error.message+'"}]}';
		console.log('Worker: return value:');
		try {
			console.log(JSON.parse(valret));
		} catch(e) {
			console.error(e);
			console.log(valret);
		}
		postMessage([ID, action, valret]);
	}
}
}());
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<